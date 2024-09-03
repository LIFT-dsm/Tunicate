// 아무 기능 없는 표시용 데코레이터입니다.
import { Reflector } from '@nestjs/core';

export const Override = Reflector.createDecorator();
