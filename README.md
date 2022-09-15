# template-typescript模板项目

## 概述

基础的ts模板配置，以及一些附加功能

- typescript
- jest
- eslint

## 构建

安装依赖

```
pnpm add -D @babel/core @babel/preset-env @babel/preset-typescript @types/jest @types/node eslint jest ts-node typescript
```

解释：

- jest：提供ts支持需要依赖以下
  - @babel/core
  - @babel/preset-env
  - @babel/preset-typescript
  - @types/jest
  - @types/node
  - jest 
  - ts-node：ts格式的配置文件所需
  - typescript
- eslint：代码规范

## 配置

- babel.confg.js
- jest.config.ts
- tsconfig.json
- .eslint.js
- .prettierrc

## 运行

```
pnpm run test
```

## 总结

提供了基础配置的环境，方便开发起步。

