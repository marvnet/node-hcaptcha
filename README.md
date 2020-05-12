# hcaptcha
## Original author: [vastus](https://github.com/vastus/node-hcaptcha)

Verify hCaptcha token validity.

## Install

```
yarn add @marvnet/hcaptcha
```

## Usage

```typescript
import { verify } from "@marvnet/hcaptcha";

const secret: string = 'my hcaptcha secret from hcaptcha.com';
const token: string = 'token from widget';

verify(secret, token)
  .then((data) => console.log('success!', data))
  .catch(console.error);
```
