import { InjectionKey } from 'vue'
import { Parameter } from '../types'
export const key = Symbol() as InjectionKey<Parameter> // 标注类型。
