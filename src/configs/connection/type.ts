export interface IConnection {
  query(sql: string, sqlParams?: any): Promise<{ error: any; data: any }>
  release(): void
  escape(param: any): string
}
