import supertest from "supertest";

import * as UserService from '../../modules/user/user.service'
import createServer from '../../utils/server'

import { createTokens } from '../factories/jwt'

import { userInput, userPayload, mongoUserData, userLoginPayload, findUserPayload, createSessionPayload } from '../mocks/user'

const app = createServer()

const mockFindUser = (payload: any) => jest.spyOn(UserService, 'findUser').mockReturnValueOnce(payload)
const mockValidatePassword = (payload: any) => jest.spyOn(UserService, 'validatePassword').mockReturnValueOnce(payload)
const mockCreateSession = (payload: any) => jest.spyOn(UserService, 'createUserSession').mockReturnValueOnce(payload)
const mockReIssueAccess = (payload: any) => jest.spyOn(UserService, 'reIssueAccessToken').mockReturnValueOnce(payload)

// @ts-ignore
const mockCreateUser = () => jest.spyOn(UserService, 'createUser').mockReturnValueOnce(userPayload)
// @ts-ignore
const mockSessionHandler = (payload: any, method: string) => jest.spyOn(UserService, method).mockReturnValueOnce(payload)

describe("User Registration", () => {

  const factorUserRoute = async (userData: any) => {
      const { statusCode, body } = await supertest(app)
        .post('/v1/api/user')
        .send(userData)

      return {
        statusCode, 
        body
      }
  }

  it("given the user correct data > should retun user payload", async () => {
    const createUserServiceMock = mockCreateUser()

    const { statusCode, body }  = await factorUserRoute(userInput)
    
    expect(statusCode).toBe(200)
    expect(body).toEqual(mongoUserData)
    expect(createUserServiceMock).toHaveBeenCalledWith(userInput)
  })

  describe('Do not given one of the required data', () => {
    it('password and passwordConfirmation do not match > should return user 400', async () => {
      const { statusCode }  = await factorUserRoute({ ...userInput, passwordConfirmation: 'DoNotMatch'});

      expect(statusCode).toBe(400)
    })

    it('user name > should return 400', async () => {
      const { name, ...restValue } = userInput

      const { statusCode } = await factorUserRoute(restValue)

      expect(statusCode).toBe(400)
    })

    it('password > should return 400', async () => {
      const { password, ...restValue } = userInput

      const { statusCode } = await factorUserRoute(restValue)

      expect(statusCode).toBe(400)
    })

    it('passwordConfirmation >  should return 400', async () => {
      const { passwordConfirmation, ...restValue } = userInput

      const { statusCode } = await factorUserRoute(restValue)

      expect(statusCode).toBe(400)
    })

    it('email > should return 400', async () => {
      const { email, ...restValue } = userInput

      const { statusCode } = await factorUserRoute(restValue)

      expect(statusCode).toBe(400)
    })
  })
})

describe('User Login', () => {
  
  it('given correct data > return refresh and access token', async () => {
    mockValidatePassword(mongoUserData)
    mockCreateSession(createSessionPayload)

    const { statusCode, body  } = await supertest(app)
      .post('/v1/api/sessions')
      .send(userLoginPayload)

    expect(statusCode).toBe(200)
    expect(body).toEqual({
      accessToken: expect.any(String),
      refreshToken: expect.any(String)
    })
  })

  describe('given incorrect data', () => {
    it('email should return 401', async () => {
      mockValidatePassword(false)

      const { statusCode, body } = await supertest(app)
        .post('/v1/api/sessions')
        .send(userLoginPayload)
    
      expect(statusCode).toBe(401)
      expect(body.message).toEqual('Invalid Email or Password')
    })

    it('password should return 401', async () => {
      mockValidatePassword(false)

      const { statusCode, body } = await supertest(app)
        .post('/v1/api/sessions')
        .send(userLoginPayload)
    
      expect(statusCode).toBe(401)
      expect(body.message).toEqual('Invalid Email or Password')
    })
  })

  describe('tokens', () => {
    it('given correct non expired accessToken > return session', async () => {
      const {accessToken} = createTokens(findUserPayload, createSessionPayload)
      mockSessionHandler(createSessionPayload, 'findUserSession')

      const { body } = await supertest(app)
        .get('/v1/api/sessions')
        .set('authorization', `Bearer ${accessToken}`)
    
      expect(body).toEqual(createSessionPayload)
    })

    it('given expired access token > return new access token in header', async () => {
      const {accessToken, refreshToken} = createTokens(findUserPayload, createSessionPayload, true)
      mockSessionHandler(createSessionPayload, 'findUserSession')
      mockFindUser(findUserPayload)
      mockReIssueAccess(accessToken)

      const { headers } = await supertest(app)
        .get('/v1/api/sessions')
        .set('authorization', `Bearer ${accessToken}`)
        .set('x-refresh', refreshToken)

      expect(headers).toHaveProperty('x-access-token')
    })

    it('given no access token > should return 403', async () => {
      const { statusCode } = await supertest(app)
        .get('/v1/api/sessions')

      expect(statusCode).toBe(403)
    })
  })
})

describe('User Logout', () => {
  it('given correct access and refresh tokens > return object with nullish access and refresh token', async () => {
    const {accessToken, refreshToken} = createTokens(findUserPayload, createSessionPayload)
    mockSessionHandler(createSessionPayload, 'updateSession')

    const { body } = await supertest(app)
      .delete('/v1/api/sessions')
      .set('authorization', `Bearer ${accessToken}`)
      .set('x-refresh', refreshToken)

    expect(body).toEqual({
      "accessToken": null,
      "refreshToken": null
    })
  })
})