export default {
  port: 8080,
  dbUri: "mongodb://root:example@localhost:27017",
  saltWorkFactor: 10,
  accessTokenTimeToLive: '15m',
  refreshTokenTimeToLive: '1y',
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQCUvXevTgmin2yhzbdKvi3EA1JN/r+sNJyhCeA9pREe7cizfQVV
rBAkiO1g0jSe3cSn6hn+mu/2s/U75pREo1DhCB5yaqzqc/s/Kz2cVor2+lJClC/g
34wTGvHeEKAAKu4eoY9enn0vLwxiC1wjHyM+4LkA9gq5MdEuWGzmPi11awIDAQAB
AoGAL41DLjBstCjzuebiqmqShw/oyDahYJSRXoqhvhN/nbu3ZmqZwgH4RzXfbgzF
9eRAcs5M8TDndp+hzzywOiFcQZhPB8WUgctC3bulGUnMWXuJY+KviWNAyBJcL1gY
29vgUmKV3Pd2gJko1FsvFU/j0N8x+yEaO0FWjQaM64GvaEECQQDLSm8Me7UugmZ2
1B7i7N5Jjwj3Si3LFV++eFbyynkthcFdHrvRxQmqBZysxJfqCFhnmoCtQFMQvdFe
Y3+vst51AkEAu04yOvNwgk/H0Ao5VdVhnH5rBe8Ikx4Z3BShv8x8eRrGNlyBZx4Y
nwKAHYxL+j9Zxy8v/wYRus9Z4lutu8xIXwJAJBWtSoj26y+IYpVaeitTdbkm/UY0
hLThjtyrimM4SUVRwma/LggMpBpk6iHnWUpr7s/1AUvGstUOwfNladmVNQJAdla7
SZ+Qz+QT/A7Zlq9QEo2UlJUnN7vm3rNyVjmd0u3lmWbsovfS2nO7+e8v+ZWY5U2c
52UwQnTK90axB1vTxQJAOuwZQP+m2+jECFiDWGjYHdevuDfhnTZYEMDfYl8tl9Fn
ZkB96k2SzV2/YNWL7R7158sKbAh+ERLU2auSQkBjcw==
-----END RSA PRIVATE KEY-----`,
  publicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCUvXevTgmin2yhzbdKvi3EA1JN
/r+sNJyhCeA9pREe7cizfQVVrBAkiO1g0jSe3cSn6hn+mu/2s/U75pREo1DhCB5y
aqzqc/s/Kz2cVor2+lJClC/g34wTGvHeEKAAKu4eoY9enn0vLwxiC1wjHyM+4LkA
9gq5MdEuWGzmPi11awIDAQAB
-----END PUBLIC KEY-----`
}