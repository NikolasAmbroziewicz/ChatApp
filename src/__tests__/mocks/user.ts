export const mongoUserData = {  
  _id: "6547de09f75d01448d0aaead",
  email: "niko1121@test.com",
  name: "Nikolas",
  createdAt: "2023-11-05T18:25:13.097Z",
  updatedAt: "2023-11-05T18:25:13.097Z"
}

export const userInput = {
  email: "niko1121@test.com",
  name: "Nikolas",
  password: "nikolas123",
  passwordConfirmation: "nikolas123"
}

export const userLoginPayload = {
  email: 'test@text.com',
  password: 'testpassword'
}

export const findUserPayload = {
  id: 47,
  email: 'test@text.com',
  user_name: 'TestUser',
  password: '$2b$12$/wqUMLOxcIX7C3B7H0n/QuMj831jCEv2I/HmezgGszH4MYdU8Hpaq'
}

export const createSessionPayload = {
  _id: 42,
  valid: true,
  user_id: 47,
  userAgent: 'PostmanRuntime/7.34.0',
  createdAt: '2022-11-15T08:50:47.713Z',
  updatedAt: '2022-11-15T08:50:47.713Z'
}

export const userPayload = {
  toJSON: jest.fn().mockReturnValue(mongoUserData)
}