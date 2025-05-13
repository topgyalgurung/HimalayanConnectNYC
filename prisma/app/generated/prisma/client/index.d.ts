
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Location
 * 
 */
export type Location = $Result.DefaultSelection<Prisma.$LocationPayload>
/**
 * Model Resource
 * 
 */
export type Resource = $Result.DefaultSelection<Prisma.$ResourcePayload>
/**
 * Model ResourceCategory
 * 
 */
export type ResourceCategory = $Result.DefaultSelection<Prisma.$ResourceCategoryPayload>
/**
 * Model ResourceEditSuggestion
 * 
 */
export type ResourceEditSuggestion = $Result.DefaultSelection<Prisma.$ResourceEditSuggestionPayload>
/**
 * Model ResourceLike
 * 
 */
export type ResourceLike = $Result.DefaultSelection<Prisma.$ResourceLikePayload>
/**
 * Model ResourceReview
 * 
 */
export type ResourceReview = $Result.DefaultSelection<Prisma.$ResourceReviewPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const ResourceStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type ResourceStatus = (typeof ResourceStatus)[keyof typeof ResourceStatus]


export const EditStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type EditStatus = (typeof EditStatus)[keyof typeof EditStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type ResourceStatus = $Enums.ResourceStatus

export const ResourceStatus: typeof $Enums.ResourceStatus

export type EditStatus = $Enums.EditStatus

export const EditStatus: typeof $Enums.EditStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.location`: Exposes CRUD operations for the **Location** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Locations
    * const locations = await prisma.location.findMany()
    * ```
    */
  get location(): Prisma.LocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resource`: Exposes CRUD operations for the **Resource** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Resources
    * const resources = await prisma.resource.findMany()
    * ```
    */
  get resource(): Prisma.ResourceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resourceCategory`: Exposes CRUD operations for the **ResourceCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ResourceCategories
    * const resourceCategories = await prisma.resourceCategory.findMany()
    * ```
    */
  get resourceCategory(): Prisma.ResourceCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resourceEditSuggestion`: Exposes CRUD operations for the **ResourceEditSuggestion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ResourceEditSuggestions
    * const resourceEditSuggestions = await prisma.resourceEditSuggestion.findMany()
    * ```
    */
  get resourceEditSuggestion(): Prisma.ResourceEditSuggestionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resourceLike`: Exposes CRUD operations for the **ResourceLike** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ResourceLikes
    * const resourceLikes = await prisma.resourceLike.findMany()
    * ```
    */
  get resourceLike(): Prisma.ResourceLikeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resourceReview`: Exposes CRUD operations for the **ResourceReview** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ResourceReviews
    * const resourceReviews = await prisma.resourceReview.findMany()
    * ```
    */
  get resourceReview(): Prisma.ResourceReviewDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Location: 'Location',
    Resource: 'Resource',
    ResourceCategory: 'ResourceCategory',
    ResourceEditSuggestion: 'ResourceEditSuggestion',
    ResourceLike: 'ResourceLike',
    ResourceReview: 'ResourceReview'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "location" | "resource" | "resourceCategory" | "resourceEditSuggestion" | "resourceLike" | "resourceReview"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Location: {
        payload: Prisma.$LocationPayload<ExtArgs>
        fields: Prisma.LocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findFirst: {
            args: Prisma.LocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findMany: {
            args: Prisma.LocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          create: {
            args: Prisma.LocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          createMany: {
            args: Prisma.LocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          delete: {
            args: Prisma.LocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          update: {
            args: Prisma.LocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          deleteMany: {
            args: Prisma.LocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          upsert: {
            args: Prisma.LocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          aggregate: {
            args: Prisma.LocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocation>
          }
          groupBy: {
            args: Prisma.LocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocationCountArgs<ExtArgs>
            result: $Utils.Optional<LocationCountAggregateOutputType> | number
          }
        }
      }
      Resource: {
        payload: Prisma.$ResourcePayload<ExtArgs>
        fields: Prisma.ResourceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResourceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResourceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          findFirst: {
            args: Prisma.ResourceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResourceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          findMany: {
            args: Prisma.ResourceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>[]
          }
          create: {
            args: Prisma.ResourceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          createMany: {
            args: Prisma.ResourceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResourceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>[]
          }
          delete: {
            args: Prisma.ResourceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          update: {
            args: Prisma.ResourceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          deleteMany: {
            args: Prisma.ResourceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResourceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResourceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>[]
          }
          upsert: {
            args: Prisma.ResourceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourcePayload>
          }
          aggregate: {
            args: Prisma.ResourceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResource>
          }
          groupBy: {
            args: Prisma.ResourceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResourceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResourceCountArgs<ExtArgs>
            result: $Utils.Optional<ResourceCountAggregateOutputType> | number
          }
        }
      }
      ResourceCategory: {
        payload: Prisma.$ResourceCategoryPayload<ExtArgs>
        fields: Prisma.ResourceCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResourceCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResourceCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceCategoryPayload>
          }
          findFirst: {
            args: Prisma.ResourceCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResourceCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceCategoryPayload>
          }
          findMany: {
            args: Prisma.ResourceCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceCategoryPayload>[]
          }
          create: {
            args: Prisma.ResourceCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceCategoryPayload>
          }
          createMany: {
            args: Prisma.ResourceCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResourceCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceCategoryPayload>[]
          }
          delete: {
            args: Prisma.ResourceCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceCategoryPayload>
          }
          update: {
            args: Prisma.ResourceCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceCategoryPayload>
          }
          deleteMany: {
            args: Prisma.ResourceCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResourceCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResourceCategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceCategoryPayload>[]
          }
          upsert: {
            args: Prisma.ResourceCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceCategoryPayload>
          }
          aggregate: {
            args: Prisma.ResourceCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResourceCategory>
          }
          groupBy: {
            args: Prisma.ResourceCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResourceCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResourceCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<ResourceCategoryCountAggregateOutputType> | number
          }
        }
      }
      ResourceEditSuggestion: {
        payload: Prisma.$ResourceEditSuggestionPayload<ExtArgs>
        fields: Prisma.ResourceEditSuggestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResourceEditSuggestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceEditSuggestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResourceEditSuggestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceEditSuggestionPayload>
          }
          findFirst: {
            args: Prisma.ResourceEditSuggestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceEditSuggestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResourceEditSuggestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceEditSuggestionPayload>
          }
          findMany: {
            args: Prisma.ResourceEditSuggestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceEditSuggestionPayload>[]
          }
          create: {
            args: Prisma.ResourceEditSuggestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceEditSuggestionPayload>
          }
          createMany: {
            args: Prisma.ResourceEditSuggestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResourceEditSuggestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceEditSuggestionPayload>[]
          }
          delete: {
            args: Prisma.ResourceEditSuggestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceEditSuggestionPayload>
          }
          update: {
            args: Prisma.ResourceEditSuggestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceEditSuggestionPayload>
          }
          deleteMany: {
            args: Prisma.ResourceEditSuggestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResourceEditSuggestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResourceEditSuggestionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceEditSuggestionPayload>[]
          }
          upsert: {
            args: Prisma.ResourceEditSuggestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceEditSuggestionPayload>
          }
          aggregate: {
            args: Prisma.ResourceEditSuggestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResourceEditSuggestion>
          }
          groupBy: {
            args: Prisma.ResourceEditSuggestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResourceEditSuggestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResourceEditSuggestionCountArgs<ExtArgs>
            result: $Utils.Optional<ResourceEditSuggestionCountAggregateOutputType> | number
          }
        }
      }
      ResourceLike: {
        payload: Prisma.$ResourceLikePayload<ExtArgs>
        fields: Prisma.ResourceLikeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResourceLikeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceLikePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResourceLikeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceLikePayload>
          }
          findFirst: {
            args: Prisma.ResourceLikeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceLikePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResourceLikeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceLikePayload>
          }
          findMany: {
            args: Prisma.ResourceLikeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceLikePayload>[]
          }
          create: {
            args: Prisma.ResourceLikeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceLikePayload>
          }
          createMany: {
            args: Prisma.ResourceLikeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResourceLikeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceLikePayload>[]
          }
          delete: {
            args: Prisma.ResourceLikeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceLikePayload>
          }
          update: {
            args: Prisma.ResourceLikeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceLikePayload>
          }
          deleteMany: {
            args: Prisma.ResourceLikeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResourceLikeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResourceLikeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceLikePayload>[]
          }
          upsert: {
            args: Prisma.ResourceLikeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceLikePayload>
          }
          aggregate: {
            args: Prisma.ResourceLikeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResourceLike>
          }
          groupBy: {
            args: Prisma.ResourceLikeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResourceLikeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResourceLikeCountArgs<ExtArgs>
            result: $Utils.Optional<ResourceLikeCountAggregateOutputType> | number
          }
        }
      }
      ResourceReview: {
        payload: Prisma.$ResourceReviewPayload<ExtArgs>
        fields: Prisma.ResourceReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResourceReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResourceReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceReviewPayload>
          }
          findFirst: {
            args: Prisma.ResourceReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResourceReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceReviewPayload>
          }
          findMany: {
            args: Prisma.ResourceReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceReviewPayload>[]
          }
          create: {
            args: Prisma.ResourceReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceReviewPayload>
          }
          createMany: {
            args: Prisma.ResourceReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResourceReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceReviewPayload>[]
          }
          delete: {
            args: Prisma.ResourceReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceReviewPayload>
          }
          update: {
            args: Prisma.ResourceReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceReviewPayload>
          }
          deleteMany: {
            args: Prisma.ResourceReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResourceReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResourceReviewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceReviewPayload>[]
          }
          upsert: {
            args: Prisma.ResourceReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResourceReviewPayload>
          }
          aggregate: {
            args: Prisma.ResourceReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResourceReview>
          }
          groupBy: {
            args: Prisma.ResourceReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResourceReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResourceReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ResourceReviewCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    location?: LocationOmit
    resource?: ResourceOmit
    resourceCategory?: ResourceCategoryOmit
    resourceEditSuggestion?: ResourceEditSuggestionOmit
    resourceLike?: ResourceLikeOmit
    resourceReview?: ResourceReviewOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    resources: number
    ResourceEditSuggestion: number
    likes: number
    reviews: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resources?: boolean | UserCountOutputTypeCountResourcesArgs
    ResourceEditSuggestion?: boolean | UserCountOutputTypeCountResourceEditSuggestionArgs
    likes?: boolean | UserCountOutputTypeCountLikesArgs
    reviews?: boolean | UserCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountResourcesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountResourceEditSuggestionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceEditSuggestionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceLikeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceReviewWhereInput
  }


  /**
   * Count Type ResourceCountOutputType
   */

  export type ResourceCountOutputType = {
    Location: number
    ResourceEditSuggestion: number
    ResourceLike: number
    ResourceReview: number
  }

  export type ResourceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Location?: boolean | ResourceCountOutputTypeCountLocationArgs
    ResourceEditSuggestion?: boolean | ResourceCountOutputTypeCountResourceEditSuggestionArgs
    ResourceLike?: boolean | ResourceCountOutputTypeCountResourceLikeArgs
    ResourceReview?: boolean | ResourceCountOutputTypeCountResourceReviewArgs
  }

  // Custom InputTypes
  /**
   * ResourceCountOutputType without action
   */
  export type ResourceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceCountOutputType
     */
    select?: ResourceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ResourceCountOutputType without action
   */
  export type ResourceCountOutputTypeCountLocationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput
  }

  /**
   * ResourceCountOutputType without action
   */
  export type ResourceCountOutputTypeCountResourceEditSuggestionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceEditSuggestionWhereInput
  }

  /**
   * ResourceCountOutputType without action
   */
  export type ResourceCountOutputTypeCountResourceLikeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceLikeWhereInput
  }

  /**
   * ResourceCountOutputType without action
   */
  export type ResourceCountOutputTypeCountResourceReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceReviewWhereInput
  }


  /**
   * Count Type ResourceCategoryCountOutputType
   */

  export type ResourceCategoryCountOutputType = {
    Resource: number
    ResourceEditSuggestion: number
  }

  export type ResourceCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Resource?: boolean | ResourceCategoryCountOutputTypeCountResourceArgs
    ResourceEditSuggestion?: boolean | ResourceCategoryCountOutputTypeCountResourceEditSuggestionArgs
  }

  // Custom InputTypes
  /**
   * ResourceCategoryCountOutputType without action
   */
  export type ResourceCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceCategoryCountOutputType
     */
    select?: ResourceCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ResourceCategoryCountOutputType without action
   */
  export type ResourceCategoryCountOutputTypeCountResourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceWhereInput
  }

  /**
   * ResourceCategoryCountOutputType without action
   */
  export type ResourceCategoryCountOutputTypeCountResourceEditSuggestionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceEditSuggestionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    email: string | null
    password: string | null
    image: string | null
    role: $Enums.Role | null
    isVerified: boolean | null
    forgotPasswordToken: string | null
    forgotPasswordTokenExpiry: Date | null
    verifyToken: string | null
    verifyTokenExpiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    email: string | null
    password: string | null
    image: string | null
    role: $Enums.Role | null
    isVerified: boolean | null
    forgotPasswordToken: string | null
    forgotPasswordTokenExpiry: Date | null
    verifyToken: string | null
    verifyTokenExpiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    email: number
    password: number
    image: number
    role: number
    isVerified: number
    forgotPasswordToken: number
    forgotPasswordTokenExpiry: number
    verifyToken: number
    verifyTokenExpiry: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    password?: true
    image?: true
    role?: true
    isVerified?: true
    forgotPasswordToken?: true
    forgotPasswordTokenExpiry?: true
    verifyToken?: true
    verifyTokenExpiry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    password?: true
    image?: true
    role?: true
    isVerified?: true
    forgotPasswordToken?: true
    forgotPasswordTokenExpiry?: true
    verifyToken?: true
    verifyTokenExpiry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    password?: true
    image?: true
    role?: true
    isVerified?: true
    forgotPasswordToken?: true
    forgotPasswordTokenExpiry?: true
    verifyToken?: true
    verifyTokenExpiry?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    firstName: string
    lastName: string
    email: string
    password: string
    image: string | null
    role: $Enums.Role
    isVerified: boolean
    forgotPasswordToken: string | null
    forgotPasswordTokenExpiry: Date | null
    verifyToken: string | null
    verifyTokenExpiry: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    image?: boolean
    role?: boolean
    isVerified?: boolean
    forgotPasswordToken?: boolean
    forgotPasswordTokenExpiry?: boolean
    verifyToken?: boolean
    verifyTokenExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resources?: boolean | User$resourcesArgs<ExtArgs>
    ResourceEditSuggestion?: boolean | User$ResourceEditSuggestionArgs<ExtArgs>
    likes?: boolean | User$likesArgs<ExtArgs>
    reviews?: boolean | User$reviewsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    image?: boolean
    role?: boolean
    isVerified?: boolean
    forgotPasswordToken?: boolean
    forgotPasswordTokenExpiry?: boolean
    verifyToken?: boolean
    verifyTokenExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    image?: boolean
    role?: boolean
    isVerified?: boolean
    forgotPasswordToken?: boolean
    forgotPasswordTokenExpiry?: boolean
    verifyToken?: boolean
    verifyTokenExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    password?: boolean
    image?: boolean
    role?: boolean
    isVerified?: boolean
    forgotPasswordToken?: boolean
    forgotPasswordTokenExpiry?: boolean
    verifyToken?: boolean
    verifyTokenExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "email" | "password" | "image" | "role" | "isVerified" | "forgotPasswordToken" | "forgotPasswordTokenExpiry" | "verifyToken" | "verifyTokenExpiry" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resources?: boolean | User$resourcesArgs<ExtArgs>
    ResourceEditSuggestion?: boolean | User$ResourceEditSuggestionArgs<ExtArgs>
    likes?: boolean | User$likesArgs<ExtArgs>
    reviews?: boolean | User$reviewsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      resources: Prisma.$ResourcePayload<ExtArgs>[]
      ResourceEditSuggestion: Prisma.$ResourceEditSuggestionPayload<ExtArgs>[]
      likes: Prisma.$ResourceLikePayload<ExtArgs>[]
      reviews: Prisma.$ResourceReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      firstName: string
      lastName: string
      email: string
      password: string
      image: string | null
      role: $Enums.Role
      isVerified: boolean
      forgotPasswordToken: string | null
      forgotPasswordTokenExpiry: Date | null
      verifyToken: string | null
      verifyTokenExpiry: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    resources<T extends User$resourcesArgs<ExtArgs> = {}>(args?: Subset<T, User$resourcesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ResourceEditSuggestion<T extends User$ResourceEditSuggestionArgs<ExtArgs> = {}>(args?: Subset<T, User$ResourceEditSuggestionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceEditSuggestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likes<T extends User$likesArgs<ExtArgs> = {}>(args?: Subset<T, User$likesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends User$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly image: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly isVerified: FieldRef<"User", 'Boolean'>
    readonly forgotPasswordToken: FieldRef<"User", 'String'>
    readonly forgotPasswordTokenExpiry: FieldRef<"User", 'DateTime'>
    readonly verifyToken: FieldRef<"User", 'String'>
    readonly verifyTokenExpiry: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.resources
   */
  export type User$resourcesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    where?: ResourceWhereInput
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    cursor?: ResourceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[]
  }

  /**
   * User.ResourceEditSuggestion
   */
  export type User$ResourceEditSuggestionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceEditSuggestion
     */
    select?: ResourceEditSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceEditSuggestion
     */
    omit?: ResourceEditSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceEditSuggestionInclude<ExtArgs> | null
    where?: ResourceEditSuggestionWhereInput
    orderBy?: ResourceEditSuggestionOrderByWithRelationInput | ResourceEditSuggestionOrderByWithRelationInput[]
    cursor?: ResourceEditSuggestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResourceEditSuggestionScalarFieldEnum | ResourceEditSuggestionScalarFieldEnum[]
  }

  /**
   * User.likes
   */
  export type User$likesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceLike
     */
    select?: ResourceLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceLike
     */
    omit?: ResourceLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceLikeInclude<ExtArgs> | null
    where?: ResourceLikeWhereInput
    orderBy?: ResourceLikeOrderByWithRelationInput | ResourceLikeOrderByWithRelationInput[]
    cursor?: ResourceLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResourceLikeScalarFieldEnum | ResourceLikeScalarFieldEnum[]
  }

  /**
   * User.reviews
   */
  export type User$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceReview
     */
    select?: ResourceReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceReview
     */
    omit?: ResourceReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceReviewInclude<ExtArgs> | null
    where?: ResourceReviewWhereInput
    orderBy?: ResourceReviewOrderByWithRelationInput | ResourceReviewOrderByWithRelationInput[]
    cursor?: ResourceReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResourceReviewScalarFieldEnum | ResourceReviewScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Location
   */

  export type AggregateLocation = {
    _count: LocationCountAggregateOutputType | null
    _avg: LocationAvgAggregateOutputType | null
    _sum: LocationSumAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  export type LocationAvgAggregateOutputType = {
    id: number | null
    resourceId: number | null
    latitude: number | null
    longitude: number | null
  }

  export type LocationSumAggregateOutputType = {
    id: number | null
    resourceId: number | null
    latitude: number | null
    longitude: number | null
  }

  export type LocationMinAggregateOutputType = {
    id: number | null
    resourceId: number | null
    latitude: number | null
    longitude: number | null
  }

  export type LocationMaxAggregateOutputType = {
    id: number | null
    resourceId: number | null
    latitude: number | null
    longitude: number | null
  }

  export type LocationCountAggregateOutputType = {
    id: number
    resourceId: number
    latitude: number
    longitude: number
    _all: number
  }


  export type LocationAvgAggregateInputType = {
    id?: true
    resourceId?: true
    latitude?: true
    longitude?: true
  }

  export type LocationSumAggregateInputType = {
    id?: true
    resourceId?: true
    latitude?: true
    longitude?: true
  }

  export type LocationMinAggregateInputType = {
    id?: true
    resourceId?: true
    latitude?: true
    longitude?: true
  }

  export type LocationMaxAggregateInputType = {
    id?: true
    resourceId?: true
    latitude?: true
    longitude?: true
  }

  export type LocationCountAggregateInputType = {
    id?: true
    resourceId?: true
    latitude?: true
    longitude?: true
    _all?: true
  }

  export type LocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Location to aggregate.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Locations
    **/
    _count?: true | LocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationMaxAggregateInputType
  }

  export type GetLocationAggregateType<T extends LocationAggregateArgs> = {
        [P in keyof T & keyof AggregateLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocation[P]>
      : GetScalarType<T[P], AggregateLocation[P]>
  }




  export type LocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput
    orderBy?: LocationOrderByWithAggregationInput | LocationOrderByWithAggregationInput[]
    by: LocationScalarFieldEnum[] | LocationScalarFieldEnum
    having?: LocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationCountAggregateInputType | true
    _avg?: LocationAvgAggregateInputType
    _sum?: LocationSumAggregateInputType
    _min?: LocationMinAggregateInputType
    _max?: LocationMaxAggregateInputType
  }

  export type LocationGroupByOutputType = {
    id: number
    resourceId: number
    latitude: number
    longitude: number
    _count: LocationCountAggregateOutputType | null
    _avg: LocationAvgAggregateOutputType | null
    _sum: LocationSumAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  type GetLocationGroupByPayload<T extends LocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationGroupByOutputType[P]>
            : GetScalarType<T[P], LocationGroupByOutputType[P]>
        }
      >
    >


  export type LocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resourceId?: boolean
    latitude?: boolean
    longitude?: boolean
    Resource?: boolean | ResourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resourceId?: boolean
    latitude?: boolean
    longitude?: boolean
    Resource?: boolean | ResourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resourceId?: boolean
    latitude?: boolean
    longitude?: boolean
    Resource?: boolean | ResourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectScalar = {
    id?: boolean
    resourceId?: boolean
    latitude?: boolean
    longitude?: boolean
  }

  export type LocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "resourceId" | "latitude" | "longitude", ExtArgs["result"]["location"]>
  export type LocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Resource?: boolean | ResourceDefaultArgs<ExtArgs>
  }
  export type LocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Resource?: boolean | ResourceDefaultArgs<ExtArgs>
  }
  export type LocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Resource?: boolean | ResourceDefaultArgs<ExtArgs>
  }

  export type $LocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Location"
    objects: {
      Resource: Prisma.$ResourcePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      resourceId: number
      latitude: number
      longitude: number
    }, ExtArgs["result"]["location"]>
    composites: {}
  }

  type LocationGetPayload<S extends boolean | null | undefined | LocationDefaultArgs> = $Result.GetResult<Prisma.$LocationPayload, S>

  type LocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LocationCountAggregateInputType | true
    }

  export interface LocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Location'], meta: { name: 'Location' } }
    /**
     * Find zero or one Location that matches the filter.
     * @param {LocationFindUniqueArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocationFindUniqueArgs>(args: SelectSubset<T, LocationFindUniqueArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Location that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocationFindUniqueOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocationFindUniqueOrThrowArgs>(args: SelectSubset<T, LocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocationFindFirstArgs>(args?: SelectSubset<T, LocationFindFirstArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocationFindFirstOrThrowArgs>(args?: SelectSubset<T, LocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Locations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Locations
     * const locations = await prisma.location.findMany()
     * 
     * // Get first 10 Locations
     * const locations = await prisma.location.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const locationWithIdOnly = await prisma.location.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LocationFindManyArgs>(args?: SelectSubset<T, LocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Location.
     * @param {LocationCreateArgs} args - Arguments to create a Location.
     * @example
     * // Create one Location
     * const Location = await prisma.location.create({
     *   data: {
     *     // ... data to create a Location
     *   }
     * })
     * 
     */
    create<T extends LocationCreateArgs>(args: SelectSubset<T, LocationCreateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Locations.
     * @param {LocationCreateManyArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocationCreateManyArgs>(args?: SelectSubset<T, LocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Locations and returns the data saved in the database.
     * @param {LocationCreateManyAndReturnArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LocationCreateManyAndReturnArgs>(args?: SelectSubset<T, LocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Location.
     * @param {LocationDeleteArgs} args - Arguments to delete one Location.
     * @example
     * // Delete one Location
     * const Location = await prisma.location.delete({
     *   where: {
     *     // ... filter to delete one Location
     *   }
     * })
     * 
     */
    delete<T extends LocationDeleteArgs>(args: SelectSubset<T, LocationDeleteArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Location.
     * @param {LocationUpdateArgs} args - Arguments to update one Location.
     * @example
     * // Update one Location
     * const location = await prisma.location.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocationUpdateArgs>(args: SelectSubset<T, LocationUpdateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Locations.
     * @param {LocationDeleteManyArgs} args - Arguments to filter Locations to delete.
     * @example
     * // Delete a few Locations
     * const { count } = await prisma.location.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocationDeleteManyArgs>(args?: SelectSubset<T, LocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocationUpdateManyArgs>(args: SelectSubset<T, LocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations and returns the data updated in the database.
     * @param {LocationUpdateManyAndReturnArgs} args - Arguments to update many Locations.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LocationUpdateManyAndReturnArgs>(args: SelectSubset<T, LocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Location.
     * @param {LocationUpsertArgs} args - Arguments to update or create a Location.
     * @example
     * // Update or create a Location
     * const location = await prisma.location.upsert({
     *   create: {
     *     // ... data to create a Location
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Location we want to update
     *   }
     * })
     */
    upsert<T extends LocationUpsertArgs>(args: SelectSubset<T, LocationUpsertArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCountArgs} args - Arguments to filter Locations to count.
     * @example
     * // Count the number of Locations
     * const count = await prisma.location.count({
     *   where: {
     *     // ... the filter for the Locations we want to count
     *   }
     * })
    **/
    count<T extends LocationCountArgs>(
      args?: Subset<T, LocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LocationAggregateArgs>(args: Subset<T, LocationAggregateArgs>): Prisma.PrismaPromise<GetLocationAggregateType<T>>

    /**
     * Group by Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocationGroupByArgs['orderBy'] }
        : { orderBy?: LocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Location model
   */
  readonly fields: LocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Location.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Resource<T extends ResourceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ResourceDefaultArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Location model
   */
  interface LocationFieldRefs {
    readonly id: FieldRef<"Location", 'Int'>
    readonly resourceId: FieldRef<"Location", 'Int'>
    readonly latitude: FieldRef<"Location", 'Float'>
    readonly longitude: FieldRef<"Location", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Location findUnique
   */
  export type LocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findUniqueOrThrow
   */
  export type LocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findFirst
   */
  export type LocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findFirstOrThrow
   */
  export type LocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findMany
   */
  export type LocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Locations to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location create
   */
  export type LocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to create a Location.
     */
    data: XOR<LocationCreateInput, LocationUncheckedCreateInput>
  }

  /**
   * Location createMany
   */
  export type LocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Location createManyAndReturn
   */
  export type LocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Location update
   */
  export type LocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to update a Location.
     */
    data: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
    /**
     * Choose, which Location to update.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location updateMany
   */
  export type LocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
  }

  /**
   * Location updateManyAndReturn
   */
  export type LocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Location upsert
   */
  export type LocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The filter to search for the Location to update in case it exists.
     */
    where: LocationWhereUniqueInput
    /**
     * In case the Location found by the `where` argument doesn't exist, create a new Location with this data.
     */
    create: XOR<LocationCreateInput, LocationUncheckedCreateInput>
    /**
     * In case the Location was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
  }

  /**
   * Location delete
   */
  export type LocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter which Location to delete.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location deleteMany
   */
  export type LocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Locations to delete
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to delete.
     */
    limit?: number
  }

  /**
   * Location without action
   */
  export type LocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
  }


  /**
   * Model Resource
   */

  export type AggregateResource = {
    _count: ResourceCountAggregateOutputType | null
    _avg: ResourceAvgAggregateOutputType | null
    _sum: ResourceSumAggregateOutputType | null
    _min: ResourceMinAggregateOutputType | null
    _max: ResourceMaxAggregateOutputType | null
  }

  export type ResourceAvgAggregateOutputType = {
    id: number | null
    rating: Decimal | null
    categoryId: number | null
    createdById: number | null
  }

  export type ResourceSumAggregateOutputType = {
    id: number | null
    rating: Decimal | null
    categoryId: number | null
    createdById: number | null
  }

  export type ResourceMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    address: string | null
    city: string | null
    openDays: string | null
    openTime: Date | null
    closeTime: Date | null
    phone: string | null
    rating: Decimal | null
    imageUrl: string | null
    facebookLink: string | null
    email: string | null
    status: $Enums.ResourceStatus | null
    url: string | null
    categoryId: number | null
    createdById: number | null
    createdAt: Date | null
  }

  export type ResourceMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    address: string | null
    city: string | null
    openDays: string | null
    openTime: Date | null
    closeTime: Date | null
    phone: string | null
    rating: Decimal | null
    imageUrl: string | null
    facebookLink: string | null
    email: string | null
    status: $Enums.ResourceStatus | null
    url: string | null
    categoryId: number | null
    createdById: number | null
    createdAt: Date | null
  }

  export type ResourceCountAggregateOutputType = {
    id: number
    name: number
    description: number
    address: number
    city: number
    openDays: number
    openTime: number
    closeTime: number
    phone: number
    rating: number
    imageUrl: number
    facebookLink: number
    email: number
    status: number
    url: number
    categoryId: number
    createdById: number
    createdAt: number
    _all: number
  }


  export type ResourceAvgAggregateInputType = {
    id?: true
    rating?: true
    categoryId?: true
    createdById?: true
  }

  export type ResourceSumAggregateInputType = {
    id?: true
    rating?: true
    categoryId?: true
    createdById?: true
  }

  export type ResourceMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    address?: true
    city?: true
    openDays?: true
    openTime?: true
    closeTime?: true
    phone?: true
    rating?: true
    imageUrl?: true
    facebookLink?: true
    email?: true
    status?: true
    url?: true
    categoryId?: true
    createdById?: true
    createdAt?: true
  }

  export type ResourceMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    address?: true
    city?: true
    openDays?: true
    openTime?: true
    closeTime?: true
    phone?: true
    rating?: true
    imageUrl?: true
    facebookLink?: true
    email?: true
    status?: true
    url?: true
    categoryId?: true
    createdById?: true
    createdAt?: true
  }

  export type ResourceCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    address?: true
    city?: true
    openDays?: true
    openTime?: true
    closeTime?: true
    phone?: true
    rating?: true
    imageUrl?: true
    facebookLink?: true
    email?: true
    status?: true
    url?: true
    categoryId?: true
    createdById?: true
    createdAt?: true
    _all?: true
  }

  export type ResourceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resource to aggregate.
     */
    where?: ResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resources to fetch.
     */
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Resources
    **/
    _count?: true | ResourceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResourceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResourceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResourceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResourceMaxAggregateInputType
  }

  export type GetResourceAggregateType<T extends ResourceAggregateArgs> = {
        [P in keyof T & keyof AggregateResource]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResource[P]>
      : GetScalarType<T[P], AggregateResource[P]>
  }




  export type ResourceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceWhereInput
    orderBy?: ResourceOrderByWithAggregationInput | ResourceOrderByWithAggregationInput[]
    by: ResourceScalarFieldEnum[] | ResourceScalarFieldEnum
    having?: ResourceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResourceCountAggregateInputType | true
    _avg?: ResourceAvgAggregateInputType
    _sum?: ResourceSumAggregateInputType
    _min?: ResourceMinAggregateInputType
    _max?: ResourceMaxAggregateInputType
  }

  export type ResourceGroupByOutputType = {
    id: number
    name: string
    description: string | null
    address: string
    city: string | null
    openDays: string | null
    openTime: Date | null
    closeTime: Date | null
    phone: string | null
    rating: Decimal
    imageUrl: string | null
    facebookLink: string | null
    email: string | null
    status: $Enums.ResourceStatus
    url: string | null
    categoryId: number | null
    createdById: number | null
    createdAt: Date
    _count: ResourceCountAggregateOutputType | null
    _avg: ResourceAvgAggregateOutputType | null
    _sum: ResourceSumAggregateOutputType | null
    _min: ResourceMinAggregateOutputType | null
    _max: ResourceMaxAggregateOutputType | null
  }

  type GetResourceGroupByPayload<T extends ResourceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResourceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResourceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResourceGroupByOutputType[P]>
            : GetScalarType<T[P], ResourceGroupByOutputType[P]>
        }
      >
    >


  export type ResourceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    city?: boolean
    openDays?: boolean
    openTime?: boolean
    closeTime?: boolean
    phone?: boolean
    rating?: boolean
    imageUrl?: boolean
    facebookLink?: boolean
    email?: boolean
    status?: boolean
    url?: boolean
    categoryId?: boolean
    createdById?: boolean
    createdAt?: boolean
    Location?: boolean | Resource$LocationArgs<ExtArgs>
    ResourceCategory?: boolean | Resource$ResourceCategoryArgs<ExtArgs>
    User?: boolean | Resource$UserArgs<ExtArgs>
    ResourceEditSuggestion?: boolean | Resource$ResourceEditSuggestionArgs<ExtArgs>
    ResourceLike?: boolean | Resource$ResourceLikeArgs<ExtArgs>
    ResourceReview?: boolean | Resource$ResourceReviewArgs<ExtArgs>
    _count?: boolean | ResourceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resource"]>

  export type ResourceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    city?: boolean
    openDays?: boolean
    openTime?: boolean
    closeTime?: boolean
    phone?: boolean
    rating?: boolean
    imageUrl?: boolean
    facebookLink?: boolean
    email?: boolean
    status?: boolean
    url?: boolean
    categoryId?: boolean
    createdById?: boolean
    createdAt?: boolean
    ResourceCategory?: boolean | Resource$ResourceCategoryArgs<ExtArgs>
    User?: boolean | Resource$UserArgs<ExtArgs>
  }, ExtArgs["result"]["resource"]>

  export type ResourceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    city?: boolean
    openDays?: boolean
    openTime?: boolean
    closeTime?: boolean
    phone?: boolean
    rating?: boolean
    imageUrl?: boolean
    facebookLink?: boolean
    email?: boolean
    status?: boolean
    url?: boolean
    categoryId?: boolean
    createdById?: boolean
    createdAt?: boolean
    ResourceCategory?: boolean | Resource$ResourceCategoryArgs<ExtArgs>
    User?: boolean | Resource$UserArgs<ExtArgs>
  }, ExtArgs["result"]["resource"]>

  export type ResourceSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    city?: boolean
    openDays?: boolean
    openTime?: boolean
    closeTime?: boolean
    phone?: boolean
    rating?: boolean
    imageUrl?: boolean
    facebookLink?: boolean
    email?: boolean
    status?: boolean
    url?: boolean
    categoryId?: boolean
    createdById?: boolean
    createdAt?: boolean
  }

  export type ResourceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "address" | "city" | "openDays" | "openTime" | "closeTime" | "phone" | "rating" | "imageUrl" | "facebookLink" | "email" | "status" | "url" | "categoryId" | "createdById" | "createdAt", ExtArgs["result"]["resource"]>
  export type ResourceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Location?: boolean | Resource$LocationArgs<ExtArgs>
    ResourceCategory?: boolean | Resource$ResourceCategoryArgs<ExtArgs>
    User?: boolean | Resource$UserArgs<ExtArgs>
    ResourceEditSuggestion?: boolean | Resource$ResourceEditSuggestionArgs<ExtArgs>
    ResourceLike?: boolean | Resource$ResourceLikeArgs<ExtArgs>
    ResourceReview?: boolean | Resource$ResourceReviewArgs<ExtArgs>
    _count?: boolean | ResourceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ResourceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ResourceCategory?: boolean | Resource$ResourceCategoryArgs<ExtArgs>
    User?: boolean | Resource$UserArgs<ExtArgs>
  }
  export type ResourceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ResourceCategory?: boolean | Resource$ResourceCategoryArgs<ExtArgs>
    User?: boolean | Resource$UserArgs<ExtArgs>
  }

  export type $ResourcePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Resource"
    objects: {
      Location: Prisma.$LocationPayload<ExtArgs>[]
      ResourceCategory: Prisma.$ResourceCategoryPayload<ExtArgs> | null
      User: Prisma.$UserPayload<ExtArgs> | null
      ResourceEditSuggestion: Prisma.$ResourceEditSuggestionPayload<ExtArgs>[]
      ResourceLike: Prisma.$ResourceLikePayload<ExtArgs>[]
      ResourceReview: Prisma.$ResourceReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      address: string
      city: string | null
      openDays: string | null
      openTime: Date | null
      closeTime: Date | null
      phone: string | null
      rating: Prisma.Decimal
      imageUrl: string | null
      facebookLink: string | null
      email: string | null
      status: $Enums.ResourceStatus
      url: string | null
      categoryId: number | null
      createdById: number | null
      createdAt: Date
    }, ExtArgs["result"]["resource"]>
    composites: {}
  }

  type ResourceGetPayload<S extends boolean | null | undefined | ResourceDefaultArgs> = $Result.GetResult<Prisma.$ResourcePayload, S>

  type ResourceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResourceCountAggregateInputType | true
    }

  export interface ResourceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Resource'], meta: { name: 'Resource' } }
    /**
     * Find zero or one Resource that matches the filter.
     * @param {ResourceFindUniqueArgs} args - Arguments to find a Resource
     * @example
     * // Get one Resource
     * const resource = await prisma.resource.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResourceFindUniqueArgs>(args: SelectSubset<T, ResourceFindUniqueArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Resource that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResourceFindUniqueOrThrowArgs} args - Arguments to find a Resource
     * @example
     * // Get one Resource
     * const resource = await prisma.resource.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResourceFindUniqueOrThrowArgs>(args: SelectSubset<T, ResourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resource that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceFindFirstArgs} args - Arguments to find a Resource
     * @example
     * // Get one Resource
     * const resource = await prisma.resource.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResourceFindFirstArgs>(args?: SelectSubset<T, ResourceFindFirstArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resource that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceFindFirstOrThrowArgs} args - Arguments to find a Resource
     * @example
     * // Get one Resource
     * const resource = await prisma.resource.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResourceFindFirstOrThrowArgs>(args?: SelectSubset<T, ResourceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Resources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Resources
     * const resources = await prisma.resource.findMany()
     * 
     * // Get first 10 Resources
     * const resources = await prisma.resource.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resourceWithIdOnly = await prisma.resource.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResourceFindManyArgs>(args?: SelectSubset<T, ResourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Resource.
     * @param {ResourceCreateArgs} args - Arguments to create a Resource.
     * @example
     * // Create one Resource
     * const Resource = await prisma.resource.create({
     *   data: {
     *     // ... data to create a Resource
     *   }
     * })
     * 
     */
    create<T extends ResourceCreateArgs>(args: SelectSubset<T, ResourceCreateArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Resources.
     * @param {ResourceCreateManyArgs} args - Arguments to create many Resources.
     * @example
     * // Create many Resources
     * const resource = await prisma.resource.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResourceCreateManyArgs>(args?: SelectSubset<T, ResourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Resources and returns the data saved in the database.
     * @param {ResourceCreateManyAndReturnArgs} args - Arguments to create many Resources.
     * @example
     * // Create many Resources
     * const resource = await prisma.resource.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Resources and only return the `id`
     * const resourceWithIdOnly = await prisma.resource.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResourceCreateManyAndReturnArgs>(args?: SelectSubset<T, ResourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Resource.
     * @param {ResourceDeleteArgs} args - Arguments to delete one Resource.
     * @example
     * // Delete one Resource
     * const Resource = await prisma.resource.delete({
     *   where: {
     *     // ... filter to delete one Resource
     *   }
     * })
     * 
     */
    delete<T extends ResourceDeleteArgs>(args: SelectSubset<T, ResourceDeleteArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Resource.
     * @param {ResourceUpdateArgs} args - Arguments to update one Resource.
     * @example
     * // Update one Resource
     * const resource = await prisma.resource.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResourceUpdateArgs>(args: SelectSubset<T, ResourceUpdateArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Resources.
     * @param {ResourceDeleteManyArgs} args - Arguments to filter Resources to delete.
     * @example
     * // Delete a few Resources
     * const { count } = await prisma.resource.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResourceDeleteManyArgs>(args?: SelectSubset<T, ResourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Resources
     * const resource = await prisma.resource.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResourceUpdateManyArgs>(args: SelectSubset<T, ResourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resources and returns the data updated in the database.
     * @param {ResourceUpdateManyAndReturnArgs} args - Arguments to update many Resources.
     * @example
     * // Update many Resources
     * const resource = await prisma.resource.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Resources and only return the `id`
     * const resourceWithIdOnly = await prisma.resource.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResourceUpdateManyAndReturnArgs>(args: SelectSubset<T, ResourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Resource.
     * @param {ResourceUpsertArgs} args - Arguments to update or create a Resource.
     * @example
     * // Update or create a Resource
     * const resource = await prisma.resource.upsert({
     *   create: {
     *     // ... data to create a Resource
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Resource we want to update
     *   }
     * })
     */
    upsert<T extends ResourceUpsertArgs>(args: SelectSubset<T, ResourceUpsertArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Resources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceCountArgs} args - Arguments to filter Resources to count.
     * @example
     * // Count the number of Resources
     * const count = await prisma.resource.count({
     *   where: {
     *     // ... the filter for the Resources we want to count
     *   }
     * })
    **/
    count<T extends ResourceCountArgs>(
      args?: Subset<T, ResourceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResourceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Resource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResourceAggregateArgs>(args: Subset<T, ResourceAggregateArgs>): Prisma.PrismaPromise<GetResourceAggregateType<T>>

    /**
     * Group by Resource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResourceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResourceGroupByArgs['orderBy'] }
        : { orderBy?: ResourceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Resource model
   */
  readonly fields: ResourceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Resource.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResourceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Location<T extends Resource$LocationArgs<ExtArgs> = {}>(args?: Subset<T, Resource$LocationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ResourceCategory<T extends Resource$ResourceCategoryArgs<ExtArgs> = {}>(args?: Subset<T, Resource$ResourceCategoryArgs<ExtArgs>>): Prisma__ResourceCategoryClient<$Result.GetResult<Prisma.$ResourceCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    User<T extends Resource$UserArgs<ExtArgs> = {}>(args?: Subset<T, Resource$UserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    ResourceEditSuggestion<T extends Resource$ResourceEditSuggestionArgs<ExtArgs> = {}>(args?: Subset<T, Resource$ResourceEditSuggestionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceEditSuggestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ResourceLike<T extends Resource$ResourceLikeArgs<ExtArgs> = {}>(args?: Subset<T, Resource$ResourceLikeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ResourceReview<T extends Resource$ResourceReviewArgs<ExtArgs> = {}>(args?: Subset<T, Resource$ResourceReviewArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Resource model
   */
  interface ResourceFieldRefs {
    readonly id: FieldRef<"Resource", 'Int'>
    readonly name: FieldRef<"Resource", 'String'>
    readonly description: FieldRef<"Resource", 'String'>
    readonly address: FieldRef<"Resource", 'String'>
    readonly city: FieldRef<"Resource", 'String'>
    readonly openDays: FieldRef<"Resource", 'String'>
    readonly openTime: FieldRef<"Resource", 'DateTime'>
    readonly closeTime: FieldRef<"Resource", 'DateTime'>
    readonly phone: FieldRef<"Resource", 'String'>
    readonly rating: FieldRef<"Resource", 'Decimal'>
    readonly imageUrl: FieldRef<"Resource", 'String'>
    readonly facebookLink: FieldRef<"Resource", 'String'>
    readonly email: FieldRef<"Resource", 'String'>
    readonly status: FieldRef<"Resource", 'ResourceStatus'>
    readonly url: FieldRef<"Resource", 'String'>
    readonly categoryId: FieldRef<"Resource", 'Int'>
    readonly createdById: FieldRef<"Resource", 'Int'>
    readonly createdAt: FieldRef<"Resource", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Resource findUnique
   */
  export type ResourceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resource to fetch.
     */
    where: ResourceWhereUniqueInput
  }

  /**
   * Resource findUniqueOrThrow
   */
  export type ResourceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resource to fetch.
     */
    where: ResourceWhereUniqueInput
  }

  /**
   * Resource findFirst
   */
  export type ResourceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resource to fetch.
     */
    where?: ResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resources to fetch.
     */
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resources.
     */
    cursor?: ResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resources.
     */
    distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[]
  }

  /**
   * Resource findFirstOrThrow
   */
  export type ResourceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resource to fetch.
     */
    where?: ResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resources to fetch.
     */
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resources.
     */
    cursor?: ResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resources.
     */
    distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[]
  }

  /**
   * Resource findMany
   */
  export type ResourceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter, which Resources to fetch.
     */
    where?: ResourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resources to fetch.
     */
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Resources.
     */
    cursor?: ResourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resources.
     */
    skip?: number
    distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[]
  }

  /**
   * Resource create
   */
  export type ResourceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * The data needed to create a Resource.
     */
    data: XOR<ResourceCreateInput, ResourceUncheckedCreateInput>
  }

  /**
   * Resource createMany
   */
  export type ResourceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Resources.
     */
    data: ResourceCreateManyInput | ResourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Resource createManyAndReturn
   */
  export type ResourceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * The data used to create many Resources.
     */
    data: ResourceCreateManyInput | ResourceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Resource update
   */
  export type ResourceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * The data needed to update a Resource.
     */
    data: XOR<ResourceUpdateInput, ResourceUncheckedUpdateInput>
    /**
     * Choose, which Resource to update.
     */
    where: ResourceWhereUniqueInput
  }

  /**
   * Resource updateMany
   */
  export type ResourceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Resources.
     */
    data: XOR<ResourceUpdateManyMutationInput, ResourceUncheckedUpdateManyInput>
    /**
     * Filter which Resources to update
     */
    where?: ResourceWhereInput
    /**
     * Limit how many Resources to update.
     */
    limit?: number
  }

  /**
   * Resource updateManyAndReturn
   */
  export type ResourceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * The data used to update Resources.
     */
    data: XOR<ResourceUpdateManyMutationInput, ResourceUncheckedUpdateManyInput>
    /**
     * Filter which Resources to update
     */
    where?: ResourceWhereInput
    /**
     * Limit how many Resources to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Resource upsert
   */
  export type ResourceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * The filter to search for the Resource to update in case it exists.
     */
    where: ResourceWhereUniqueInput
    /**
     * In case the Resource found by the `where` argument doesn't exist, create a new Resource with this data.
     */
    create: XOR<ResourceCreateInput, ResourceUncheckedCreateInput>
    /**
     * In case the Resource was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResourceUpdateInput, ResourceUncheckedUpdateInput>
  }

  /**
   * Resource delete
   */
  export type ResourceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    /**
     * Filter which Resource to delete.
     */
    where: ResourceWhereUniqueInput
  }

  /**
   * Resource deleteMany
   */
  export type ResourceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resources to delete
     */
    where?: ResourceWhereInput
    /**
     * Limit how many Resources to delete.
     */
    limit?: number
  }

  /**
   * Resource.Location
   */
  export type Resource$LocationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    where?: LocationWhereInput
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    cursor?: LocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Resource.ResourceCategory
   */
  export type Resource$ResourceCategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceCategory
     */
    select?: ResourceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceCategory
     */
    omit?: ResourceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceCategoryInclude<ExtArgs> | null
    where?: ResourceCategoryWhereInput
  }

  /**
   * Resource.User
   */
  export type Resource$UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Resource.ResourceEditSuggestion
   */
  export type Resource$ResourceEditSuggestionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceEditSuggestion
     */
    select?: ResourceEditSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceEditSuggestion
     */
    omit?: ResourceEditSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceEditSuggestionInclude<ExtArgs> | null
    where?: ResourceEditSuggestionWhereInput
    orderBy?: ResourceEditSuggestionOrderByWithRelationInput | ResourceEditSuggestionOrderByWithRelationInput[]
    cursor?: ResourceEditSuggestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResourceEditSuggestionScalarFieldEnum | ResourceEditSuggestionScalarFieldEnum[]
  }

  /**
   * Resource.ResourceLike
   */
  export type Resource$ResourceLikeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceLike
     */
    select?: ResourceLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceLike
     */
    omit?: ResourceLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceLikeInclude<ExtArgs> | null
    where?: ResourceLikeWhereInput
    orderBy?: ResourceLikeOrderByWithRelationInput | ResourceLikeOrderByWithRelationInput[]
    cursor?: ResourceLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResourceLikeScalarFieldEnum | ResourceLikeScalarFieldEnum[]
  }

  /**
   * Resource.ResourceReview
   */
  export type Resource$ResourceReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceReview
     */
    select?: ResourceReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceReview
     */
    omit?: ResourceReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceReviewInclude<ExtArgs> | null
    where?: ResourceReviewWhereInput
    orderBy?: ResourceReviewOrderByWithRelationInput | ResourceReviewOrderByWithRelationInput[]
    cursor?: ResourceReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResourceReviewScalarFieldEnum | ResourceReviewScalarFieldEnum[]
  }

  /**
   * Resource without action
   */
  export type ResourceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
  }


  /**
   * Model ResourceCategory
   */

  export type AggregateResourceCategory = {
    _count: ResourceCategoryCountAggregateOutputType | null
    _avg: ResourceCategoryAvgAggregateOutputType | null
    _sum: ResourceCategorySumAggregateOutputType | null
    _min: ResourceCategoryMinAggregateOutputType | null
    _max: ResourceCategoryMaxAggregateOutputType | null
  }

  export type ResourceCategoryAvgAggregateOutputType = {
    id: number | null
  }

  export type ResourceCategorySumAggregateOutputType = {
    id: number | null
  }

  export type ResourceCategoryMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type ResourceCategoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type ResourceCategoryCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type ResourceCategoryAvgAggregateInputType = {
    id?: true
  }

  export type ResourceCategorySumAggregateInputType = {
    id?: true
  }

  export type ResourceCategoryMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type ResourceCategoryMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type ResourceCategoryCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type ResourceCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResourceCategory to aggregate.
     */
    where?: ResourceCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceCategories to fetch.
     */
    orderBy?: ResourceCategoryOrderByWithRelationInput | ResourceCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResourceCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ResourceCategories
    **/
    _count?: true | ResourceCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResourceCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResourceCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResourceCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResourceCategoryMaxAggregateInputType
  }

  export type GetResourceCategoryAggregateType<T extends ResourceCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateResourceCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResourceCategory[P]>
      : GetScalarType<T[P], AggregateResourceCategory[P]>
  }




  export type ResourceCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceCategoryWhereInput
    orderBy?: ResourceCategoryOrderByWithAggregationInput | ResourceCategoryOrderByWithAggregationInput[]
    by: ResourceCategoryScalarFieldEnum[] | ResourceCategoryScalarFieldEnum
    having?: ResourceCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResourceCategoryCountAggregateInputType | true
    _avg?: ResourceCategoryAvgAggregateInputType
    _sum?: ResourceCategorySumAggregateInputType
    _min?: ResourceCategoryMinAggregateInputType
    _max?: ResourceCategoryMaxAggregateInputType
  }

  export type ResourceCategoryGroupByOutputType = {
    id: number
    name: string
    _count: ResourceCategoryCountAggregateOutputType | null
    _avg: ResourceCategoryAvgAggregateOutputType | null
    _sum: ResourceCategorySumAggregateOutputType | null
    _min: ResourceCategoryMinAggregateOutputType | null
    _max: ResourceCategoryMaxAggregateOutputType | null
  }

  type GetResourceCategoryGroupByPayload<T extends ResourceCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResourceCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResourceCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResourceCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], ResourceCategoryGroupByOutputType[P]>
        }
      >
    >


  export type ResourceCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    Resource?: boolean | ResourceCategory$ResourceArgs<ExtArgs>
    ResourceEditSuggestion?: boolean | ResourceCategory$ResourceEditSuggestionArgs<ExtArgs>
    _count?: boolean | ResourceCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resourceCategory"]>

  export type ResourceCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["resourceCategory"]>

  export type ResourceCategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["resourceCategory"]>

  export type ResourceCategorySelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type ResourceCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["resourceCategory"]>
  export type ResourceCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Resource?: boolean | ResourceCategory$ResourceArgs<ExtArgs>
    ResourceEditSuggestion?: boolean | ResourceCategory$ResourceEditSuggestionArgs<ExtArgs>
    _count?: boolean | ResourceCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ResourceCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ResourceCategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ResourceCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ResourceCategory"
    objects: {
      Resource: Prisma.$ResourcePayload<ExtArgs>[]
      ResourceEditSuggestion: Prisma.$ResourceEditSuggestionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["resourceCategory"]>
    composites: {}
  }

  type ResourceCategoryGetPayload<S extends boolean | null | undefined | ResourceCategoryDefaultArgs> = $Result.GetResult<Prisma.$ResourceCategoryPayload, S>

  type ResourceCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResourceCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResourceCategoryCountAggregateInputType | true
    }

  export interface ResourceCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ResourceCategory'], meta: { name: 'ResourceCategory' } }
    /**
     * Find zero or one ResourceCategory that matches the filter.
     * @param {ResourceCategoryFindUniqueArgs} args - Arguments to find a ResourceCategory
     * @example
     * // Get one ResourceCategory
     * const resourceCategory = await prisma.resourceCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResourceCategoryFindUniqueArgs>(args: SelectSubset<T, ResourceCategoryFindUniqueArgs<ExtArgs>>): Prisma__ResourceCategoryClient<$Result.GetResult<Prisma.$ResourceCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ResourceCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResourceCategoryFindUniqueOrThrowArgs} args - Arguments to find a ResourceCategory
     * @example
     * // Get one ResourceCategory
     * const resourceCategory = await prisma.resourceCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResourceCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ResourceCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResourceCategoryClient<$Result.GetResult<Prisma.$ResourceCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResourceCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceCategoryFindFirstArgs} args - Arguments to find a ResourceCategory
     * @example
     * // Get one ResourceCategory
     * const resourceCategory = await prisma.resourceCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResourceCategoryFindFirstArgs>(args?: SelectSubset<T, ResourceCategoryFindFirstArgs<ExtArgs>>): Prisma__ResourceCategoryClient<$Result.GetResult<Prisma.$ResourceCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResourceCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceCategoryFindFirstOrThrowArgs} args - Arguments to find a ResourceCategory
     * @example
     * // Get one ResourceCategory
     * const resourceCategory = await prisma.resourceCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResourceCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ResourceCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResourceCategoryClient<$Result.GetResult<Prisma.$ResourceCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ResourceCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResourceCategories
     * const resourceCategories = await prisma.resourceCategory.findMany()
     * 
     * // Get first 10 ResourceCategories
     * const resourceCategories = await prisma.resourceCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resourceCategoryWithIdOnly = await prisma.resourceCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResourceCategoryFindManyArgs>(args?: SelectSubset<T, ResourceCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ResourceCategory.
     * @param {ResourceCategoryCreateArgs} args - Arguments to create a ResourceCategory.
     * @example
     * // Create one ResourceCategory
     * const ResourceCategory = await prisma.resourceCategory.create({
     *   data: {
     *     // ... data to create a ResourceCategory
     *   }
     * })
     * 
     */
    create<T extends ResourceCategoryCreateArgs>(args: SelectSubset<T, ResourceCategoryCreateArgs<ExtArgs>>): Prisma__ResourceCategoryClient<$Result.GetResult<Prisma.$ResourceCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ResourceCategories.
     * @param {ResourceCategoryCreateManyArgs} args - Arguments to create many ResourceCategories.
     * @example
     * // Create many ResourceCategories
     * const resourceCategory = await prisma.resourceCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResourceCategoryCreateManyArgs>(args?: SelectSubset<T, ResourceCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ResourceCategories and returns the data saved in the database.
     * @param {ResourceCategoryCreateManyAndReturnArgs} args - Arguments to create many ResourceCategories.
     * @example
     * // Create many ResourceCategories
     * const resourceCategory = await prisma.resourceCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ResourceCategories and only return the `id`
     * const resourceCategoryWithIdOnly = await prisma.resourceCategory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResourceCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, ResourceCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ResourceCategory.
     * @param {ResourceCategoryDeleteArgs} args - Arguments to delete one ResourceCategory.
     * @example
     * // Delete one ResourceCategory
     * const ResourceCategory = await prisma.resourceCategory.delete({
     *   where: {
     *     // ... filter to delete one ResourceCategory
     *   }
     * })
     * 
     */
    delete<T extends ResourceCategoryDeleteArgs>(args: SelectSubset<T, ResourceCategoryDeleteArgs<ExtArgs>>): Prisma__ResourceCategoryClient<$Result.GetResult<Prisma.$ResourceCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ResourceCategory.
     * @param {ResourceCategoryUpdateArgs} args - Arguments to update one ResourceCategory.
     * @example
     * // Update one ResourceCategory
     * const resourceCategory = await prisma.resourceCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResourceCategoryUpdateArgs>(args: SelectSubset<T, ResourceCategoryUpdateArgs<ExtArgs>>): Prisma__ResourceCategoryClient<$Result.GetResult<Prisma.$ResourceCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ResourceCategories.
     * @param {ResourceCategoryDeleteManyArgs} args - Arguments to filter ResourceCategories to delete.
     * @example
     * // Delete a few ResourceCategories
     * const { count } = await prisma.resourceCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResourceCategoryDeleteManyArgs>(args?: SelectSubset<T, ResourceCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResourceCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResourceCategories
     * const resourceCategory = await prisma.resourceCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResourceCategoryUpdateManyArgs>(args: SelectSubset<T, ResourceCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResourceCategories and returns the data updated in the database.
     * @param {ResourceCategoryUpdateManyAndReturnArgs} args - Arguments to update many ResourceCategories.
     * @example
     * // Update many ResourceCategories
     * const resourceCategory = await prisma.resourceCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ResourceCategories and only return the `id`
     * const resourceCategoryWithIdOnly = await prisma.resourceCategory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResourceCategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, ResourceCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ResourceCategory.
     * @param {ResourceCategoryUpsertArgs} args - Arguments to update or create a ResourceCategory.
     * @example
     * // Update or create a ResourceCategory
     * const resourceCategory = await prisma.resourceCategory.upsert({
     *   create: {
     *     // ... data to create a ResourceCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResourceCategory we want to update
     *   }
     * })
     */
    upsert<T extends ResourceCategoryUpsertArgs>(args: SelectSubset<T, ResourceCategoryUpsertArgs<ExtArgs>>): Prisma__ResourceCategoryClient<$Result.GetResult<Prisma.$ResourceCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ResourceCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceCategoryCountArgs} args - Arguments to filter ResourceCategories to count.
     * @example
     * // Count the number of ResourceCategories
     * const count = await prisma.resourceCategory.count({
     *   where: {
     *     // ... the filter for the ResourceCategories we want to count
     *   }
     * })
    **/
    count<T extends ResourceCategoryCountArgs>(
      args?: Subset<T, ResourceCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResourceCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ResourceCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResourceCategoryAggregateArgs>(args: Subset<T, ResourceCategoryAggregateArgs>): Prisma.PrismaPromise<GetResourceCategoryAggregateType<T>>

    /**
     * Group by ResourceCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResourceCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResourceCategoryGroupByArgs['orderBy'] }
        : { orderBy?: ResourceCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResourceCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResourceCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ResourceCategory model
   */
  readonly fields: ResourceCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ResourceCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResourceCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Resource<T extends ResourceCategory$ResourceArgs<ExtArgs> = {}>(args?: Subset<T, ResourceCategory$ResourceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ResourceEditSuggestion<T extends ResourceCategory$ResourceEditSuggestionArgs<ExtArgs> = {}>(args?: Subset<T, ResourceCategory$ResourceEditSuggestionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceEditSuggestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ResourceCategory model
   */
  interface ResourceCategoryFieldRefs {
    readonly id: FieldRef<"ResourceCategory", 'Int'>
    readonly name: FieldRef<"ResourceCategory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ResourceCategory findUnique
   */
  export type ResourceCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceCategory
     */
    select?: ResourceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceCategory
     */
    omit?: ResourceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ResourceCategory to fetch.
     */
    where: ResourceCategoryWhereUniqueInput
  }

  /**
   * ResourceCategory findUniqueOrThrow
   */
  export type ResourceCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceCategory
     */
    select?: ResourceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceCategory
     */
    omit?: ResourceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ResourceCategory to fetch.
     */
    where: ResourceCategoryWhereUniqueInput
  }

  /**
   * ResourceCategory findFirst
   */
  export type ResourceCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceCategory
     */
    select?: ResourceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceCategory
     */
    omit?: ResourceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ResourceCategory to fetch.
     */
    where?: ResourceCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceCategories to fetch.
     */
    orderBy?: ResourceCategoryOrderByWithRelationInput | ResourceCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResourceCategories.
     */
    cursor?: ResourceCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResourceCategories.
     */
    distinct?: ResourceCategoryScalarFieldEnum | ResourceCategoryScalarFieldEnum[]
  }

  /**
   * ResourceCategory findFirstOrThrow
   */
  export type ResourceCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceCategory
     */
    select?: ResourceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceCategory
     */
    omit?: ResourceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ResourceCategory to fetch.
     */
    where?: ResourceCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceCategories to fetch.
     */
    orderBy?: ResourceCategoryOrderByWithRelationInput | ResourceCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResourceCategories.
     */
    cursor?: ResourceCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResourceCategories.
     */
    distinct?: ResourceCategoryScalarFieldEnum | ResourceCategoryScalarFieldEnum[]
  }

  /**
   * ResourceCategory findMany
   */
  export type ResourceCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceCategory
     */
    select?: ResourceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceCategory
     */
    omit?: ResourceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ResourceCategories to fetch.
     */
    where?: ResourceCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceCategories to fetch.
     */
    orderBy?: ResourceCategoryOrderByWithRelationInput | ResourceCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ResourceCategories.
     */
    cursor?: ResourceCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceCategories.
     */
    skip?: number
    distinct?: ResourceCategoryScalarFieldEnum | ResourceCategoryScalarFieldEnum[]
  }

  /**
   * ResourceCategory create
   */
  export type ResourceCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceCategory
     */
    select?: ResourceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceCategory
     */
    omit?: ResourceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ResourceCategory.
     */
    data: XOR<ResourceCategoryCreateInput, ResourceCategoryUncheckedCreateInput>
  }

  /**
   * ResourceCategory createMany
   */
  export type ResourceCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResourceCategories.
     */
    data: ResourceCategoryCreateManyInput | ResourceCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ResourceCategory createManyAndReturn
   */
  export type ResourceCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceCategory
     */
    select?: ResourceCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceCategory
     */
    omit?: ResourceCategoryOmit<ExtArgs> | null
    /**
     * The data used to create many ResourceCategories.
     */
    data: ResourceCategoryCreateManyInput | ResourceCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ResourceCategory update
   */
  export type ResourceCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceCategory
     */
    select?: ResourceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceCategory
     */
    omit?: ResourceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ResourceCategory.
     */
    data: XOR<ResourceCategoryUpdateInput, ResourceCategoryUncheckedUpdateInput>
    /**
     * Choose, which ResourceCategory to update.
     */
    where: ResourceCategoryWhereUniqueInput
  }

  /**
   * ResourceCategory updateMany
   */
  export type ResourceCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ResourceCategories.
     */
    data: XOR<ResourceCategoryUpdateManyMutationInput, ResourceCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ResourceCategories to update
     */
    where?: ResourceCategoryWhereInput
    /**
     * Limit how many ResourceCategories to update.
     */
    limit?: number
  }

  /**
   * ResourceCategory updateManyAndReturn
   */
  export type ResourceCategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceCategory
     */
    select?: ResourceCategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceCategory
     */
    omit?: ResourceCategoryOmit<ExtArgs> | null
    /**
     * The data used to update ResourceCategories.
     */
    data: XOR<ResourceCategoryUpdateManyMutationInput, ResourceCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ResourceCategories to update
     */
    where?: ResourceCategoryWhereInput
    /**
     * Limit how many ResourceCategories to update.
     */
    limit?: number
  }

  /**
   * ResourceCategory upsert
   */
  export type ResourceCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceCategory
     */
    select?: ResourceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceCategory
     */
    omit?: ResourceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ResourceCategory to update in case it exists.
     */
    where: ResourceCategoryWhereUniqueInput
    /**
     * In case the ResourceCategory found by the `where` argument doesn't exist, create a new ResourceCategory with this data.
     */
    create: XOR<ResourceCategoryCreateInput, ResourceCategoryUncheckedCreateInput>
    /**
     * In case the ResourceCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResourceCategoryUpdateInput, ResourceCategoryUncheckedUpdateInput>
  }

  /**
   * ResourceCategory delete
   */
  export type ResourceCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceCategory
     */
    select?: ResourceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceCategory
     */
    omit?: ResourceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceCategoryInclude<ExtArgs> | null
    /**
     * Filter which ResourceCategory to delete.
     */
    where: ResourceCategoryWhereUniqueInput
  }

  /**
   * ResourceCategory deleteMany
   */
  export type ResourceCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResourceCategories to delete
     */
    where?: ResourceCategoryWhereInput
    /**
     * Limit how many ResourceCategories to delete.
     */
    limit?: number
  }

  /**
   * ResourceCategory.Resource
   */
  export type ResourceCategory$ResourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resource
     */
    select?: ResourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resource
     */
    omit?: ResourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceInclude<ExtArgs> | null
    where?: ResourceWhereInput
    orderBy?: ResourceOrderByWithRelationInput | ResourceOrderByWithRelationInput[]
    cursor?: ResourceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResourceScalarFieldEnum | ResourceScalarFieldEnum[]
  }

  /**
   * ResourceCategory.ResourceEditSuggestion
   */
  export type ResourceCategory$ResourceEditSuggestionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceEditSuggestion
     */
    select?: ResourceEditSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceEditSuggestion
     */
    omit?: ResourceEditSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceEditSuggestionInclude<ExtArgs> | null
    where?: ResourceEditSuggestionWhereInput
    orderBy?: ResourceEditSuggestionOrderByWithRelationInput | ResourceEditSuggestionOrderByWithRelationInput[]
    cursor?: ResourceEditSuggestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResourceEditSuggestionScalarFieldEnum | ResourceEditSuggestionScalarFieldEnum[]
  }

  /**
   * ResourceCategory without action
   */
  export type ResourceCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceCategory
     */
    select?: ResourceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceCategory
     */
    omit?: ResourceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceCategoryInclude<ExtArgs> | null
  }


  /**
   * Model ResourceEditSuggestion
   */

  export type AggregateResourceEditSuggestion = {
    _count: ResourceEditSuggestionCountAggregateOutputType | null
    _avg: ResourceEditSuggestionAvgAggregateOutputType | null
    _sum: ResourceEditSuggestionSumAggregateOutputType | null
    _min: ResourceEditSuggestionMinAggregateOutputType | null
    _max: ResourceEditSuggestionMaxAggregateOutputType | null
  }

  export type ResourceEditSuggestionAvgAggregateOutputType = {
    id: number | null
    resourceId: number | null
    suggestedById: number | null
    categoryId: number | null
  }

  export type ResourceEditSuggestionSumAggregateOutputType = {
    id: number | null
    resourceId: number | null
    suggestedById: number | null
    categoryId: number | null
  }

  export type ResourceEditSuggestionMinAggregateOutputType = {
    id: number | null
    resourceId: number | null
    suggestedById: number | null
    name: string | null
    categoryId: number | null
    address: string | null
    openDays: string | null
    openTime: Date | null
    closeTime: Date | null
    phone: string | null
    url: string | null
    createdAt: Date | null
    status: $Enums.ResourceStatus | null
  }

  export type ResourceEditSuggestionMaxAggregateOutputType = {
    id: number | null
    resourceId: number | null
    suggestedById: number | null
    name: string | null
    categoryId: number | null
    address: string | null
    openDays: string | null
    openTime: Date | null
    closeTime: Date | null
    phone: string | null
    url: string | null
    createdAt: Date | null
    status: $Enums.ResourceStatus | null
  }

  export type ResourceEditSuggestionCountAggregateOutputType = {
    id: number
    resourceId: number
    suggestedById: number
    name: number
    categoryId: number
    address: number
    openDays: number
    openTime: number
    closeTime: number
    phone: number
    url: number
    createdAt: number
    status: number
    _all: number
  }


  export type ResourceEditSuggestionAvgAggregateInputType = {
    id?: true
    resourceId?: true
    suggestedById?: true
    categoryId?: true
  }

  export type ResourceEditSuggestionSumAggregateInputType = {
    id?: true
    resourceId?: true
    suggestedById?: true
    categoryId?: true
  }

  export type ResourceEditSuggestionMinAggregateInputType = {
    id?: true
    resourceId?: true
    suggestedById?: true
    name?: true
    categoryId?: true
    address?: true
    openDays?: true
    openTime?: true
    closeTime?: true
    phone?: true
    url?: true
    createdAt?: true
    status?: true
  }

  export type ResourceEditSuggestionMaxAggregateInputType = {
    id?: true
    resourceId?: true
    suggestedById?: true
    name?: true
    categoryId?: true
    address?: true
    openDays?: true
    openTime?: true
    closeTime?: true
    phone?: true
    url?: true
    createdAt?: true
    status?: true
  }

  export type ResourceEditSuggestionCountAggregateInputType = {
    id?: true
    resourceId?: true
    suggestedById?: true
    name?: true
    categoryId?: true
    address?: true
    openDays?: true
    openTime?: true
    closeTime?: true
    phone?: true
    url?: true
    createdAt?: true
    status?: true
    _all?: true
  }

  export type ResourceEditSuggestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResourceEditSuggestion to aggregate.
     */
    where?: ResourceEditSuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceEditSuggestions to fetch.
     */
    orderBy?: ResourceEditSuggestionOrderByWithRelationInput | ResourceEditSuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResourceEditSuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceEditSuggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceEditSuggestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ResourceEditSuggestions
    **/
    _count?: true | ResourceEditSuggestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResourceEditSuggestionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResourceEditSuggestionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResourceEditSuggestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResourceEditSuggestionMaxAggregateInputType
  }

  export type GetResourceEditSuggestionAggregateType<T extends ResourceEditSuggestionAggregateArgs> = {
        [P in keyof T & keyof AggregateResourceEditSuggestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResourceEditSuggestion[P]>
      : GetScalarType<T[P], AggregateResourceEditSuggestion[P]>
  }




  export type ResourceEditSuggestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceEditSuggestionWhereInput
    orderBy?: ResourceEditSuggestionOrderByWithAggregationInput | ResourceEditSuggestionOrderByWithAggregationInput[]
    by: ResourceEditSuggestionScalarFieldEnum[] | ResourceEditSuggestionScalarFieldEnum
    having?: ResourceEditSuggestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResourceEditSuggestionCountAggregateInputType | true
    _avg?: ResourceEditSuggestionAvgAggregateInputType
    _sum?: ResourceEditSuggestionSumAggregateInputType
    _min?: ResourceEditSuggestionMinAggregateInputType
    _max?: ResourceEditSuggestionMaxAggregateInputType
  }

  export type ResourceEditSuggestionGroupByOutputType = {
    id: number
    resourceId: number
    suggestedById: number | null
    name: string | null
    categoryId: number | null
    address: string | null
    openDays: string | null
    openTime: Date | null
    closeTime: Date | null
    phone: string | null
    url: string | null
    createdAt: Date
    status: $Enums.ResourceStatus
    _count: ResourceEditSuggestionCountAggregateOutputType | null
    _avg: ResourceEditSuggestionAvgAggregateOutputType | null
    _sum: ResourceEditSuggestionSumAggregateOutputType | null
    _min: ResourceEditSuggestionMinAggregateOutputType | null
    _max: ResourceEditSuggestionMaxAggregateOutputType | null
  }

  type GetResourceEditSuggestionGroupByPayload<T extends ResourceEditSuggestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResourceEditSuggestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResourceEditSuggestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResourceEditSuggestionGroupByOutputType[P]>
            : GetScalarType<T[P], ResourceEditSuggestionGroupByOutputType[P]>
        }
      >
    >


  export type ResourceEditSuggestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resourceId?: boolean
    suggestedById?: boolean
    name?: boolean
    categoryId?: boolean
    address?: boolean
    openDays?: boolean
    openTime?: boolean
    closeTime?: boolean
    phone?: boolean
    url?: boolean
    createdAt?: boolean
    status?: boolean
    ResourceCategory?: boolean | ResourceEditSuggestion$ResourceCategoryArgs<ExtArgs>
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
    User?: boolean | ResourceEditSuggestion$UserArgs<ExtArgs>
  }, ExtArgs["result"]["resourceEditSuggestion"]>

  export type ResourceEditSuggestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resourceId?: boolean
    suggestedById?: boolean
    name?: boolean
    categoryId?: boolean
    address?: boolean
    openDays?: boolean
    openTime?: boolean
    closeTime?: boolean
    phone?: boolean
    url?: boolean
    createdAt?: boolean
    status?: boolean
    ResourceCategory?: boolean | ResourceEditSuggestion$ResourceCategoryArgs<ExtArgs>
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
    User?: boolean | ResourceEditSuggestion$UserArgs<ExtArgs>
  }, ExtArgs["result"]["resourceEditSuggestion"]>

  export type ResourceEditSuggestionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resourceId?: boolean
    suggestedById?: boolean
    name?: boolean
    categoryId?: boolean
    address?: boolean
    openDays?: boolean
    openTime?: boolean
    closeTime?: boolean
    phone?: boolean
    url?: boolean
    createdAt?: boolean
    status?: boolean
    ResourceCategory?: boolean | ResourceEditSuggestion$ResourceCategoryArgs<ExtArgs>
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
    User?: boolean | ResourceEditSuggestion$UserArgs<ExtArgs>
  }, ExtArgs["result"]["resourceEditSuggestion"]>

  export type ResourceEditSuggestionSelectScalar = {
    id?: boolean
    resourceId?: boolean
    suggestedById?: boolean
    name?: boolean
    categoryId?: boolean
    address?: boolean
    openDays?: boolean
    openTime?: boolean
    closeTime?: boolean
    phone?: boolean
    url?: boolean
    createdAt?: boolean
    status?: boolean
  }

  export type ResourceEditSuggestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "resourceId" | "suggestedById" | "name" | "categoryId" | "address" | "openDays" | "openTime" | "closeTime" | "phone" | "url" | "createdAt" | "status", ExtArgs["result"]["resourceEditSuggestion"]>
  export type ResourceEditSuggestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ResourceCategory?: boolean | ResourceEditSuggestion$ResourceCategoryArgs<ExtArgs>
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
    User?: boolean | ResourceEditSuggestion$UserArgs<ExtArgs>
  }
  export type ResourceEditSuggestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ResourceCategory?: boolean | ResourceEditSuggestion$ResourceCategoryArgs<ExtArgs>
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
    User?: boolean | ResourceEditSuggestion$UserArgs<ExtArgs>
  }
  export type ResourceEditSuggestionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ResourceCategory?: boolean | ResourceEditSuggestion$ResourceCategoryArgs<ExtArgs>
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
    User?: boolean | ResourceEditSuggestion$UserArgs<ExtArgs>
  }

  export type $ResourceEditSuggestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ResourceEditSuggestion"
    objects: {
      ResourceCategory: Prisma.$ResourceCategoryPayload<ExtArgs> | null
      resource: Prisma.$ResourcePayload<ExtArgs>
      User: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      resourceId: number
      suggestedById: number | null
      name: string | null
      categoryId: number | null
      address: string | null
      openDays: string | null
      openTime: Date | null
      closeTime: Date | null
      phone: string | null
      url: string | null
      createdAt: Date
      status: $Enums.ResourceStatus
    }, ExtArgs["result"]["resourceEditSuggestion"]>
    composites: {}
  }

  type ResourceEditSuggestionGetPayload<S extends boolean | null | undefined | ResourceEditSuggestionDefaultArgs> = $Result.GetResult<Prisma.$ResourceEditSuggestionPayload, S>

  type ResourceEditSuggestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResourceEditSuggestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResourceEditSuggestionCountAggregateInputType | true
    }

  export interface ResourceEditSuggestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ResourceEditSuggestion'], meta: { name: 'ResourceEditSuggestion' } }
    /**
     * Find zero or one ResourceEditSuggestion that matches the filter.
     * @param {ResourceEditSuggestionFindUniqueArgs} args - Arguments to find a ResourceEditSuggestion
     * @example
     * // Get one ResourceEditSuggestion
     * const resourceEditSuggestion = await prisma.resourceEditSuggestion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResourceEditSuggestionFindUniqueArgs>(args: SelectSubset<T, ResourceEditSuggestionFindUniqueArgs<ExtArgs>>): Prisma__ResourceEditSuggestionClient<$Result.GetResult<Prisma.$ResourceEditSuggestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ResourceEditSuggestion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResourceEditSuggestionFindUniqueOrThrowArgs} args - Arguments to find a ResourceEditSuggestion
     * @example
     * // Get one ResourceEditSuggestion
     * const resourceEditSuggestion = await prisma.resourceEditSuggestion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResourceEditSuggestionFindUniqueOrThrowArgs>(args: SelectSubset<T, ResourceEditSuggestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResourceEditSuggestionClient<$Result.GetResult<Prisma.$ResourceEditSuggestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResourceEditSuggestion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceEditSuggestionFindFirstArgs} args - Arguments to find a ResourceEditSuggestion
     * @example
     * // Get one ResourceEditSuggestion
     * const resourceEditSuggestion = await prisma.resourceEditSuggestion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResourceEditSuggestionFindFirstArgs>(args?: SelectSubset<T, ResourceEditSuggestionFindFirstArgs<ExtArgs>>): Prisma__ResourceEditSuggestionClient<$Result.GetResult<Prisma.$ResourceEditSuggestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResourceEditSuggestion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceEditSuggestionFindFirstOrThrowArgs} args - Arguments to find a ResourceEditSuggestion
     * @example
     * // Get one ResourceEditSuggestion
     * const resourceEditSuggestion = await prisma.resourceEditSuggestion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResourceEditSuggestionFindFirstOrThrowArgs>(args?: SelectSubset<T, ResourceEditSuggestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResourceEditSuggestionClient<$Result.GetResult<Prisma.$ResourceEditSuggestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ResourceEditSuggestions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceEditSuggestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResourceEditSuggestions
     * const resourceEditSuggestions = await prisma.resourceEditSuggestion.findMany()
     * 
     * // Get first 10 ResourceEditSuggestions
     * const resourceEditSuggestions = await prisma.resourceEditSuggestion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resourceEditSuggestionWithIdOnly = await prisma.resourceEditSuggestion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResourceEditSuggestionFindManyArgs>(args?: SelectSubset<T, ResourceEditSuggestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceEditSuggestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ResourceEditSuggestion.
     * @param {ResourceEditSuggestionCreateArgs} args - Arguments to create a ResourceEditSuggestion.
     * @example
     * // Create one ResourceEditSuggestion
     * const ResourceEditSuggestion = await prisma.resourceEditSuggestion.create({
     *   data: {
     *     // ... data to create a ResourceEditSuggestion
     *   }
     * })
     * 
     */
    create<T extends ResourceEditSuggestionCreateArgs>(args: SelectSubset<T, ResourceEditSuggestionCreateArgs<ExtArgs>>): Prisma__ResourceEditSuggestionClient<$Result.GetResult<Prisma.$ResourceEditSuggestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ResourceEditSuggestions.
     * @param {ResourceEditSuggestionCreateManyArgs} args - Arguments to create many ResourceEditSuggestions.
     * @example
     * // Create many ResourceEditSuggestions
     * const resourceEditSuggestion = await prisma.resourceEditSuggestion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResourceEditSuggestionCreateManyArgs>(args?: SelectSubset<T, ResourceEditSuggestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ResourceEditSuggestions and returns the data saved in the database.
     * @param {ResourceEditSuggestionCreateManyAndReturnArgs} args - Arguments to create many ResourceEditSuggestions.
     * @example
     * // Create many ResourceEditSuggestions
     * const resourceEditSuggestion = await prisma.resourceEditSuggestion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ResourceEditSuggestions and only return the `id`
     * const resourceEditSuggestionWithIdOnly = await prisma.resourceEditSuggestion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResourceEditSuggestionCreateManyAndReturnArgs>(args?: SelectSubset<T, ResourceEditSuggestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceEditSuggestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ResourceEditSuggestion.
     * @param {ResourceEditSuggestionDeleteArgs} args - Arguments to delete one ResourceEditSuggestion.
     * @example
     * // Delete one ResourceEditSuggestion
     * const ResourceEditSuggestion = await prisma.resourceEditSuggestion.delete({
     *   where: {
     *     // ... filter to delete one ResourceEditSuggestion
     *   }
     * })
     * 
     */
    delete<T extends ResourceEditSuggestionDeleteArgs>(args: SelectSubset<T, ResourceEditSuggestionDeleteArgs<ExtArgs>>): Prisma__ResourceEditSuggestionClient<$Result.GetResult<Prisma.$ResourceEditSuggestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ResourceEditSuggestion.
     * @param {ResourceEditSuggestionUpdateArgs} args - Arguments to update one ResourceEditSuggestion.
     * @example
     * // Update one ResourceEditSuggestion
     * const resourceEditSuggestion = await prisma.resourceEditSuggestion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResourceEditSuggestionUpdateArgs>(args: SelectSubset<T, ResourceEditSuggestionUpdateArgs<ExtArgs>>): Prisma__ResourceEditSuggestionClient<$Result.GetResult<Prisma.$ResourceEditSuggestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ResourceEditSuggestions.
     * @param {ResourceEditSuggestionDeleteManyArgs} args - Arguments to filter ResourceEditSuggestions to delete.
     * @example
     * // Delete a few ResourceEditSuggestions
     * const { count } = await prisma.resourceEditSuggestion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResourceEditSuggestionDeleteManyArgs>(args?: SelectSubset<T, ResourceEditSuggestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResourceEditSuggestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceEditSuggestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResourceEditSuggestions
     * const resourceEditSuggestion = await prisma.resourceEditSuggestion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResourceEditSuggestionUpdateManyArgs>(args: SelectSubset<T, ResourceEditSuggestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResourceEditSuggestions and returns the data updated in the database.
     * @param {ResourceEditSuggestionUpdateManyAndReturnArgs} args - Arguments to update many ResourceEditSuggestions.
     * @example
     * // Update many ResourceEditSuggestions
     * const resourceEditSuggestion = await prisma.resourceEditSuggestion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ResourceEditSuggestions and only return the `id`
     * const resourceEditSuggestionWithIdOnly = await prisma.resourceEditSuggestion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResourceEditSuggestionUpdateManyAndReturnArgs>(args: SelectSubset<T, ResourceEditSuggestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceEditSuggestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ResourceEditSuggestion.
     * @param {ResourceEditSuggestionUpsertArgs} args - Arguments to update or create a ResourceEditSuggestion.
     * @example
     * // Update or create a ResourceEditSuggestion
     * const resourceEditSuggestion = await prisma.resourceEditSuggestion.upsert({
     *   create: {
     *     // ... data to create a ResourceEditSuggestion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResourceEditSuggestion we want to update
     *   }
     * })
     */
    upsert<T extends ResourceEditSuggestionUpsertArgs>(args: SelectSubset<T, ResourceEditSuggestionUpsertArgs<ExtArgs>>): Prisma__ResourceEditSuggestionClient<$Result.GetResult<Prisma.$ResourceEditSuggestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ResourceEditSuggestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceEditSuggestionCountArgs} args - Arguments to filter ResourceEditSuggestions to count.
     * @example
     * // Count the number of ResourceEditSuggestions
     * const count = await prisma.resourceEditSuggestion.count({
     *   where: {
     *     // ... the filter for the ResourceEditSuggestions we want to count
     *   }
     * })
    **/
    count<T extends ResourceEditSuggestionCountArgs>(
      args?: Subset<T, ResourceEditSuggestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResourceEditSuggestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ResourceEditSuggestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceEditSuggestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResourceEditSuggestionAggregateArgs>(args: Subset<T, ResourceEditSuggestionAggregateArgs>): Prisma.PrismaPromise<GetResourceEditSuggestionAggregateType<T>>

    /**
     * Group by ResourceEditSuggestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceEditSuggestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResourceEditSuggestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResourceEditSuggestionGroupByArgs['orderBy'] }
        : { orderBy?: ResourceEditSuggestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResourceEditSuggestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResourceEditSuggestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ResourceEditSuggestion model
   */
  readonly fields: ResourceEditSuggestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ResourceEditSuggestion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResourceEditSuggestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ResourceCategory<T extends ResourceEditSuggestion$ResourceCategoryArgs<ExtArgs> = {}>(args?: Subset<T, ResourceEditSuggestion$ResourceCategoryArgs<ExtArgs>>): Prisma__ResourceCategoryClient<$Result.GetResult<Prisma.$ResourceCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    resource<T extends ResourceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ResourceDefaultArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    User<T extends ResourceEditSuggestion$UserArgs<ExtArgs> = {}>(args?: Subset<T, ResourceEditSuggestion$UserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ResourceEditSuggestion model
   */
  interface ResourceEditSuggestionFieldRefs {
    readonly id: FieldRef<"ResourceEditSuggestion", 'Int'>
    readonly resourceId: FieldRef<"ResourceEditSuggestion", 'Int'>
    readonly suggestedById: FieldRef<"ResourceEditSuggestion", 'Int'>
    readonly name: FieldRef<"ResourceEditSuggestion", 'String'>
    readonly categoryId: FieldRef<"ResourceEditSuggestion", 'Int'>
    readonly address: FieldRef<"ResourceEditSuggestion", 'String'>
    readonly openDays: FieldRef<"ResourceEditSuggestion", 'String'>
    readonly openTime: FieldRef<"ResourceEditSuggestion", 'DateTime'>
    readonly closeTime: FieldRef<"ResourceEditSuggestion", 'DateTime'>
    readonly phone: FieldRef<"ResourceEditSuggestion", 'String'>
    readonly url: FieldRef<"ResourceEditSuggestion", 'String'>
    readonly createdAt: FieldRef<"ResourceEditSuggestion", 'DateTime'>
    readonly status: FieldRef<"ResourceEditSuggestion", 'ResourceStatus'>
  }
    

  // Custom InputTypes
  /**
   * ResourceEditSuggestion findUnique
   */
  export type ResourceEditSuggestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceEditSuggestion
     */
    select?: ResourceEditSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceEditSuggestion
     */
    omit?: ResourceEditSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceEditSuggestionInclude<ExtArgs> | null
    /**
     * Filter, which ResourceEditSuggestion to fetch.
     */
    where: ResourceEditSuggestionWhereUniqueInput
  }

  /**
   * ResourceEditSuggestion findUniqueOrThrow
   */
  export type ResourceEditSuggestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceEditSuggestion
     */
    select?: ResourceEditSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceEditSuggestion
     */
    omit?: ResourceEditSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceEditSuggestionInclude<ExtArgs> | null
    /**
     * Filter, which ResourceEditSuggestion to fetch.
     */
    where: ResourceEditSuggestionWhereUniqueInput
  }

  /**
   * ResourceEditSuggestion findFirst
   */
  export type ResourceEditSuggestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceEditSuggestion
     */
    select?: ResourceEditSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceEditSuggestion
     */
    omit?: ResourceEditSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceEditSuggestionInclude<ExtArgs> | null
    /**
     * Filter, which ResourceEditSuggestion to fetch.
     */
    where?: ResourceEditSuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceEditSuggestions to fetch.
     */
    orderBy?: ResourceEditSuggestionOrderByWithRelationInput | ResourceEditSuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResourceEditSuggestions.
     */
    cursor?: ResourceEditSuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceEditSuggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceEditSuggestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResourceEditSuggestions.
     */
    distinct?: ResourceEditSuggestionScalarFieldEnum | ResourceEditSuggestionScalarFieldEnum[]
  }

  /**
   * ResourceEditSuggestion findFirstOrThrow
   */
  export type ResourceEditSuggestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceEditSuggestion
     */
    select?: ResourceEditSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceEditSuggestion
     */
    omit?: ResourceEditSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceEditSuggestionInclude<ExtArgs> | null
    /**
     * Filter, which ResourceEditSuggestion to fetch.
     */
    where?: ResourceEditSuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceEditSuggestions to fetch.
     */
    orderBy?: ResourceEditSuggestionOrderByWithRelationInput | ResourceEditSuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResourceEditSuggestions.
     */
    cursor?: ResourceEditSuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceEditSuggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceEditSuggestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResourceEditSuggestions.
     */
    distinct?: ResourceEditSuggestionScalarFieldEnum | ResourceEditSuggestionScalarFieldEnum[]
  }

  /**
   * ResourceEditSuggestion findMany
   */
  export type ResourceEditSuggestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceEditSuggestion
     */
    select?: ResourceEditSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceEditSuggestion
     */
    omit?: ResourceEditSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceEditSuggestionInclude<ExtArgs> | null
    /**
     * Filter, which ResourceEditSuggestions to fetch.
     */
    where?: ResourceEditSuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceEditSuggestions to fetch.
     */
    orderBy?: ResourceEditSuggestionOrderByWithRelationInput | ResourceEditSuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ResourceEditSuggestions.
     */
    cursor?: ResourceEditSuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceEditSuggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceEditSuggestions.
     */
    skip?: number
    distinct?: ResourceEditSuggestionScalarFieldEnum | ResourceEditSuggestionScalarFieldEnum[]
  }

  /**
   * ResourceEditSuggestion create
   */
  export type ResourceEditSuggestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceEditSuggestion
     */
    select?: ResourceEditSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceEditSuggestion
     */
    omit?: ResourceEditSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceEditSuggestionInclude<ExtArgs> | null
    /**
     * The data needed to create a ResourceEditSuggestion.
     */
    data: XOR<ResourceEditSuggestionCreateInput, ResourceEditSuggestionUncheckedCreateInput>
  }

  /**
   * ResourceEditSuggestion createMany
   */
  export type ResourceEditSuggestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResourceEditSuggestions.
     */
    data: ResourceEditSuggestionCreateManyInput | ResourceEditSuggestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ResourceEditSuggestion createManyAndReturn
   */
  export type ResourceEditSuggestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceEditSuggestion
     */
    select?: ResourceEditSuggestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceEditSuggestion
     */
    omit?: ResourceEditSuggestionOmit<ExtArgs> | null
    /**
     * The data used to create many ResourceEditSuggestions.
     */
    data: ResourceEditSuggestionCreateManyInput | ResourceEditSuggestionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceEditSuggestionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResourceEditSuggestion update
   */
  export type ResourceEditSuggestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceEditSuggestion
     */
    select?: ResourceEditSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceEditSuggestion
     */
    omit?: ResourceEditSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceEditSuggestionInclude<ExtArgs> | null
    /**
     * The data needed to update a ResourceEditSuggestion.
     */
    data: XOR<ResourceEditSuggestionUpdateInput, ResourceEditSuggestionUncheckedUpdateInput>
    /**
     * Choose, which ResourceEditSuggestion to update.
     */
    where: ResourceEditSuggestionWhereUniqueInput
  }

  /**
   * ResourceEditSuggestion updateMany
   */
  export type ResourceEditSuggestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ResourceEditSuggestions.
     */
    data: XOR<ResourceEditSuggestionUpdateManyMutationInput, ResourceEditSuggestionUncheckedUpdateManyInput>
    /**
     * Filter which ResourceEditSuggestions to update
     */
    where?: ResourceEditSuggestionWhereInput
    /**
     * Limit how many ResourceEditSuggestions to update.
     */
    limit?: number
  }

  /**
   * ResourceEditSuggestion updateManyAndReturn
   */
  export type ResourceEditSuggestionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceEditSuggestion
     */
    select?: ResourceEditSuggestionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceEditSuggestion
     */
    omit?: ResourceEditSuggestionOmit<ExtArgs> | null
    /**
     * The data used to update ResourceEditSuggestions.
     */
    data: XOR<ResourceEditSuggestionUpdateManyMutationInput, ResourceEditSuggestionUncheckedUpdateManyInput>
    /**
     * Filter which ResourceEditSuggestions to update
     */
    where?: ResourceEditSuggestionWhereInput
    /**
     * Limit how many ResourceEditSuggestions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceEditSuggestionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResourceEditSuggestion upsert
   */
  export type ResourceEditSuggestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceEditSuggestion
     */
    select?: ResourceEditSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceEditSuggestion
     */
    omit?: ResourceEditSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceEditSuggestionInclude<ExtArgs> | null
    /**
     * The filter to search for the ResourceEditSuggestion to update in case it exists.
     */
    where: ResourceEditSuggestionWhereUniqueInput
    /**
     * In case the ResourceEditSuggestion found by the `where` argument doesn't exist, create a new ResourceEditSuggestion with this data.
     */
    create: XOR<ResourceEditSuggestionCreateInput, ResourceEditSuggestionUncheckedCreateInput>
    /**
     * In case the ResourceEditSuggestion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResourceEditSuggestionUpdateInput, ResourceEditSuggestionUncheckedUpdateInput>
  }

  /**
   * ResourceEditSuggestion delete
   */
  export type ResourceEditSuggestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceEditSuggestion
     */
    select?: ResourceEditSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceEditSuggestion
     */
    omit?: ResourceEditSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceEditSuggestionInclude<ExtArgs> | null
    /**
     * Filter which ResourceEditSuggestion to delete.
     */
    where: ResourceEditSuggestionWhereUniqueInput
  }

  /**
   * ResourceEditSuggestion deleteMany
   */
  export type ResourceEditSuggestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResourceEditSuggestions to delete
     */
    where?: ResourceEditSuggestionWhereInput
    /**
     * Limit how many ResourceEditSuggestions to delete.
     */
    limit?: number
  }

  /**
   * ResourceEditSuggestion.ResourceCategory
   */
  export type ResourceEditSuggestion$ResourceCategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceCategory
     */
    select?: ResourceCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceCategory
     */
    omit?: ResourceCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceCategoryInclude<ExtArgs> | null
    where?: ResourceCategoryWhereInput
  }

  /**
   * ResourceEditSuggestion.User
   */
  export type ResourceEditSuggestion$UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * ResourceEditSuggestion without action
   */
  export type ResourceEditSuggestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceEditSuggestion
     */
    select?: ResourceEditSuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceEditSuggestion
     */
    omit?: ResourceEditSuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceEditSuggestionInclude<ExtArgs> | null
  }


  /**
   * Model ResourceLike
   */

  export type AggregateResourceLike = {
    _count: ResourceLikeCountAggregateOutputType | null
    _avg: ResourceLikeAvgAggregateOutputType | null
    _sum: ResourceLikeSumAggregateOutputType | null
    _min: ResourceLikeMinAggregateOutputType | null
    _max: ResourceLikeMaxAggregateOutputType | null
  }

  export type ResourceLikeAvgAggregateOutputType = {
    id: number | null
    resourceId: number | null
    userId: number | null
  }

  export type ResourceLikeSumAggregateOutputType = {
    id: number | null
    resourceId: number | null
    userId: number | null
  }

  export type ResourceLikeMinAggregateOutputType = {
    id: number | null
    resourceId: number | null
    userId: number | null
    createdAt: Date | null
  }

  export type ResourceLikeMaxAggregateOutputType = {
    id: number | null
    resourceId: number | null
    userId: number | null
    createdAt: Date | null
  }

  export type ResourceLikeCountAggregateOutputType = {
    id: number
    resourceId: number
    userId: number
    createdAt: number
    _all: number
  }


  export type ResourceLikeAvgAggregateInputType = {
    id?: true
    resourceId?: true
    userId?: true
  }

  export type ResourceLikeSumAggregateInputType = {
    id?: true
    resourceId?: true
    userId?: true
  }

  export type ResourceLikeMinAggregateInputType = {
    id?: true
    resourceId?: true
    userId?: true
    createdAt?: true
  }

  export type ResourceLikeMaxAggregateInputType = {
    id?: true
    resourceId?: true
    userId?: true
    createdAt?: true
  }

  export type ResourceLikeCountAggregateInputType = {
    id?: true
    resourceId?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type ResourceLikeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResourceLike to aggregate.
     */
    where?: ResourceLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceLikes to fetch.
     */
    orderBy?: ResourceLikeOrderByWithRelationInput | ResourceLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResourceLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ResourceLikes
    **/
    _count?: true | ResourceLikeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResourceLikeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResourceLikeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResourceLikeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResourceLikeMaxAggregateInputType
  }

  export type GetResourceLikeAggregateType<T extends ResourceLikeAggregateArgs> = {
        [P in keyof T & keyof AggregateResourceLike]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResourceLike[P]>
      : GetScalarType<T[P], AggregateResourceLike[P]>
  }




  export type ResourceLikeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceLikeWhereInput
    orderBy?: ResourceLikeOrderByWithAggregationInput | ResourceLikeOrderByWithAggregationInput[]
    by: ResourceLikeScalarFieldEnum[] | ResourceLikeScalarFieldEnum
    having?: ResourceLikeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResourceLikeCountAggregateInputType | true
    _avg?: ResourceLikeAvgAggregateInputType
    _sum?: ResourceLikeSumAggregateInputType
    _min?: ResourceLikeMinAggregateInputType
    _max?: ResourceLikeMaxAggregateInputType
  }

  export type ResourceLikeGroupByOutputType = {
    id: number
    resourceId: number
    userId: number
    createdAt: Date
    _count: ResourceLikeCountAggregateOutputType | null
    _avg: ResourceLikeAvgAggregateOutputType | null
    _sum: ResourceLikeSumAggregateOutputType | null
    _min: ResourceLikeMinAggregateOutputType | null
    _max: ResourceLikeMaxAggregateOutputType | null
  }

  type GetResourceLikeGroupByPayload<T extends ResourceLikeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResourceLikeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResourceLikeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResourceLikeGroupByOutputType[P]>
            : GetScalarType<T[P], ResourceLikeGroupByOutputType[P]>
        }
      >
    >


  export type ResourceLikeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resourceId?: boolean
    userId?: boolean
    createdAt?: boolean
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resourceLike"]>

  export type ResourceLikeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resourceId?: boolean
    userId?: boolean
    createdAt?: boolean
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resourceLike"]>

  export type ResourceLikeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resourceId?: boolean
    userId?: boolean
    createdAt?: boolean
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resourceLike"]>

  export type ResourceLikeSelectScalar = {
    id?: boolean
    resourceId?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type ResourceLikeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "resourceId" | "userId" | "createdAt", ExtArgs["result"]["resourceLike"]>
  export type ResourceLikeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ResourceLikeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ResourceLikeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ResourceLikePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ResourceLike"
    objects: {
      resource: Prisma.$ResourcePayload<ExtArgs>
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      resourceId: number
      userId: number
      createdAt: Date
    }, ExtArgs["result"]["resourceLike"]>
    composites: {}
  }

  type ResourceLikeGetPayload<S extends boolean | null | undefined | ResourceLikeDefaultArgs> = $Result.GetResult<Prisma.$ResourceLikePayload, S>

  type ResourceLikeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResourceLikeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResourceLikeCountAggregateInputType | true
    }

  export interface ResourceLikeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ResourceLike'], meta: { name: 'ResourceLike' } }
    /**
     * Find zero or one ResourceLike that matches the filter.
     * @param {ResourceLikeFindUniqueArgs} args - Arguments to find a ResourceLike
     * @example
     * // Get one ResourceLike
     * const resourceLike = await prisma.resourceLike.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResourceLikeFindUniqueArgs>(args: SelectSubset<T, ResourceLikeFindUniqueArgs<ExtArgs>>): Prisma__ResourceLikeClient<$Result.GetResult<Prisma.$ResourceLikePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ResourceLike that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResourceLikeFindUniqueOrThrowArgs} args - Arguments to find a ResourceLike
     * @example
     * // Get one ResourceLike
     * const resourceLike = await prisma.resourceLike.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResourceLikeFindUniqueOrThrowArgs>(args: SelectSubset<T, ResourceLikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResourceLikeClient<$Result.GetResult<Prisma.$ResourceLikePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResourceLike that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceLikeFindFirstArgs} args - Arguments to find a ResourceLike
     * @example
     * // Get one ResourceLike
     * const resourceLike = await prisma.resourceLike.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResourceLikeFindFirstArgs>(args?: SelectSubset<T, ResourceLikeFindFirstArgs<ExtArgs>>): Prisma__ResourceLikeClient<$Result.GetResult<Prisma.$ResourceLikePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResourceLike that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceLikeFindFirstOrThrowArgs} args - Arguments to find a ResourceLike
     * @example
     * // Get one ResourceLike
     * const resourceLike = await prisma.resourceLike.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResourceLikeFindFirstOrThrowArgs>(args?: SelectSubset<T, ResourceLikeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResourceLikeClient<$Result.GetResult<Prisma.$ResourceLikePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ResourceLikes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceLikeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResourceLikes
     * const resourceLikes = await prisma.resourceLike.findMany()
     * 
     * // Get first 10 ResourceLikes
     * const resourceLikes = await prisma.resourceLike.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resourceLikeWithIdOnly = await prisma.resourceLike.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResourceLikeFindManyArgs>(args?: SelectSubset<T, ResourceLikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ResourceLike.
     * @param {ResourceLikeCreateArgs} args - Arguments to create a ResourceLike.
     * @example
     * // Create one ResourceLike
     * const ResourceLike = await prisma.resourceLike.create({
     *   data: {
     *     // ... data to create a ResourceLike
     *   }
     * })
     * 
     */
    create<T extends ResourceLikeCreateArgs>(args: SelectSubset<T, ResourceLikeCreateArgs<ExtArgs>>): Prisma__ResourceLikeClient<$Result.GetResult<Prisma.$ResourceLikePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ResourceLikes.
     * @param {ResourceLikeCreateManyArgs} args - Arguments to create many ResourceLikes.
     * @example
     * // Create many ResourceLikes
     * const resourceLike = await prisma.resourceLike.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResourceLikeCreateManyArgs>(args?: SelectSubset<T, ResourceLikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ResourceLikes and returns the data saved in the database.
     * @param {ResourceLikeCreateManyAndReturnArgs} args - Arguments to create many ResourceLikes.
     * @example
     * // Create many ResourceLikes
     * const resourceLike = await prisma.resourceLike.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ResourceLikes and only return the `id`
     * const resourceLikeWithIdOnly = await prisma.resourceLike.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResourceLikeCreateManyAndReturnArgs>(args?: SelectSubset<T, ResourceLikeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceLikePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ResourceLike.
     * @param {ResourceLikeDeleteArgs} args - Arguments to delete one ResourceLike.
     * @example
     * // Delete one ResourceLike
     * const ResourceLike = await prisma.resourceLike.delete({
     *   where: {
     *     // ... filter to delete one ResourceLike
     *   }
     * })
     * 
     */
    delete<T extends ResourceLikeDeleteArgs>(args: SelectSubset<T, ResourceLikeDeleteArgs<ExtArgs>>): Prisma__ResourceLikeClient<$Result.GetResult<Prisma.$ResourceLikePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ResourceLike.
     * @param {ResourceLikeUpdateArgs} args - Arguments to update one ResourceLike.
     * @example
     * // Update one ResourceLike
     * const resourceLike = await prisma.resourceLike.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResourceLikeUpdateArgs>(args: SelectSubset<T, ResourceLikeUpdateArgs<ExtArgs>>): Prisma__ResourceLikeClient<$Result.GetResult<Prisma.$ResourceLikePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ResourceLikes.
     * @param {ResourceLikeDeleteManyArgs} args - Arguments to filter ResourceLikes to delete.
     * @example
     * // Delete a few ResourceLikes
     * const { count } = await prisma.resourceLike.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResourceLikeDeleteManyArgs>(args?: SelectSubset<T, ResourceLikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResourceLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceLikeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResourceLikes
     * const resourceLike = await prisma.resourceLike.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResourceLikeUpdateManyArgs>(args: SelectSubset<T, ResourceLikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResourceLikes and returns the data updated in the database.
     * @param {ResourceLikeUpdateManyAndReturnArgs} args - Arguments to update many ResourceLikes.
     * @example
     * // Update many ResourceLikes
     * const resourceLike = await prisma.resourceLike.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ResourceLikes and only return the `id`
     * const resourceLikeWithIdOnly = await prisma.resourceLike.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResourceLikeUpdateManyAndReturnArgs>(args: SelectSubset<T, ResourceLikeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceLikePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ResourceLike.
     * @param {ResourceLikeUpsertArgs} args - Arguments to update or create a ResourceLike.
     * @example
     * // Update or create a ResourceLike
     * const resourceLike = await prisma.resourceLike.upsert({
     *   create: {
     *     // ... data to create a ResourceLike
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResourceLike we want to update
     *   }
     * })
     */
    upsert<T extends ResourceLikeUpsertArgs>(args: SelectSubset<T, ResourceLikeUpsertArgs<ExtArgs>>): Prisma__ResourceLikeClient<$Result.GetResult<Prisma.$ResourceLikePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ResourceLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceLikeCountArgs} args - Arguments to filter ResourceLikes to count.
     * @example
     * // Count the number of ResourceLikes
     * const count = await prisma.resourceLike.count({
     *   where: {
     *     // ... the filter for the ResourceLikes we want to count
     *   }
     * })
    **/
    count<T extends ResourceLikeCountArgs>(
      args?: Subset<T, ResourceLikeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResourceLikeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ResourceLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceLikeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResourceLikeAggregateArgs>(args: Subset<T, ResourceLikeAggregateArgs>): Prisma.PrismaPromise<GetResourceLikeAggregateType<T>>

    /**
     * Group by ResourceLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceLikeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResourceLikeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResourceLikeGroupByArgs['orderBy'] }
        : { orderBy?: ResourceLikeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResourceLikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResourceLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ResourceLike model
   */
  readonly fields: ResourceLikeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ResourceLike.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResourceLikeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    resource<T extends ResourceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ResourceDefaultArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ResourceLike model
   */
  interface ResourceLikeFieldRefs {
    readonly id: FieldRef<"ResourceLike", 'Int'>
    readonly resourceId: FieldRef<"ResourceLike", 'Int'>
    readonly userId: FieldRef<"ResourceLike", 'Int'>
    readonly createdAt: FieldRef<"ResourceLike", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ResourceLike findUnique
   */
  export type ResourceLikeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceLike
     */
    select?: ResourceLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceLike
     */
    omit?: ResourceLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceLikeInclude<ExtArgs> | null
    /**
     * Filter, which ResourceLike to fetch.
     */
    where: ResourceLikeWhereUniqueInput
  }

  /**
   * ResourceLike findUniqueOrThrow
   */
  export type ResourceLikeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceLike
     */
    select?: ResourceLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceLike
     */
    omit?: ResourceLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceLikeInclude<ExtArgs> | null
    /**
     * Filter, which ResourceLike to fetch.
     */
    where: ResourceLikeWhereUniqueInput
  }

  /**
   * ResourceLike findFirst
   */
  export type ResourceLikeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceLike
     */
    select?: ResourceLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceLike
     */
    omit?: ResourceLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceLikeInclude<ExtArgs> | null
    /**
     * Filter, which ResourceLike to fetch.
     */
    where?: ResourceLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceLikes to fetch.
     */
    orderBy?: ResourceLikeOrderByWithRelationInput | ResourceLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResourceLikes.
     */
    cursor?: ResourceLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResourceLikes.
     */
    distinct?: ResourceLikeScalarFieldEnum | ResourceLikeScalarFieldEnum[]
  }

  /**
   * ResourceLike findFirstOrThrow
   */
  export type ResourceLikeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceLike
     */
    select?: ResourceLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceLike
     */
    omit?: ResourceLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceLikeInclude<ExtArgs> | null
    /**
     * Filter, which ResourceLike to fetch.
     */
    where?: ResourceLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceLikes to fetch.
     */
    orderBy?: ResourceLikeOrderByWithRelationInput | ResourceLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResourceLikes.
     */
    cursor?: ResourceLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResourceLikes.
     */
    distinct?: ResourceLikeScalarFieldEnum | ResourceLikeScalarFieldEnum[]
  }

  /**
   * ResourceLike findMany
   */
  export type ResourceLikeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceLike
     */
    select?: ResourceLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceLike
     */
    omit?: ResourceLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceLikeInclude<ExtArgs> | null
    /**
     * Filter, which ResourceLikes to fetch.
     */
    where?: ResourceLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceLikes to fetch.
     */
    orderBy?: ResourceLikeOrderByWithRelationInput | ResourceLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ResourceLikes.
     */
    cursor?: ResourceLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceLikes.
     */
    skip?: number
    distinct?: ResourceLikeScalarFieldEnum | ResourceLikeScalarFieldEnum[]
  }

  /**
   * ResourceLike create
   */
  export type ResourceLikeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceLike
     */
    select?: ResourceLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceLike
     */
    omit?: ResourceLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceLikeInclude<ExtArgs> | null
    /**
     * The data needed to create a ResourceLike.
     */
    data: XOR<ResourceLikeCreateInput, ResourceLikeUncheckedCreateInput>
  }

  /**
   * ResourceLike createMany
   */
  export type ResourceLikeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResourceLikes.
     */
    data: ResourceLikeCreateManyInput | ResourceLikeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ResourceLike createManyAndReturn
   */
  export type ResourceLikeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceLike
     */
    select?: ResourceLikeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceLike
     */
    omit?: ResourceLikeOmit<ExtArgs> | null
    /**
     * The data used to create many ResourceLikes.
     */
    data: ResourceLikeCreateManyInput | ResourceLikeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceLikeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResourceLike update
   */
  export type ResourceLikeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceLike
     */
    select?: ResourceLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceLike
     */
    omit?: ResourceLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceLikeInclude<ExtArgs> | null
    /**
     * The data needed to update a ResourceLike.
     */
    data: XOR<ResourceLikeUpdateInput, ResourceLikeUncheckedUpdateInput>
    /**
     * Choose, which ResourceLike to update.
     */
    where: ResourceLikeWhereUniqueInput
  }

  /**
   * ResourceLike updateMany
   */
  export type ResourceLikeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ResourceLikes.
     */
    data: XOR<ResourceLikeUpdateManyMutationInput, ResourceLikeUncheckedUpdateManyInput>
    /**
     * Filter which ResourceLikes to update
     */
    where?: ResourceLikeWhereInput
    /**
     * Limit how many ResourceLikes to update.
     */
    limit?: number
  }

  /**
   * ResourceLike updateManyAndReturn
   */
  export type ResourceLikeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceLike
     */
    select?: ResourceLikeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceLike
     */
    omit?: ResourceLikeOmit<ExtArgs> | null
    /**
     * The data used to update ResourceLikes.
     */
    data: XOR<ResourceLikeUpdateManyMutationInput, ResourceLikeUncheckedUpdateManyInput>
    /**
     * Filter which ResourceLikes to update
     */
    where?: ResourceLikeWhereInput
    /**
     * Limit how many ResourceLikes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceLikeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResourceLike upsert
   */
  export type ResourceLikeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceLike
     */
    select?: ResourceLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceLike
     */
    omit?: ResourceLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceLikeInclude<ExtArgs> | null
    /**
     * The filter to search for the ResourceLike to update in case it exists.
     */
    where: ResourceLikeWhereUniqueInput
    /**
     * In case the ResourceLike found by the `where` argument doesn't exist, create a new ResourceLike with this data.
     */
    create: XOR<ResourceLikeCreateInput, ResourceLikeUncheckedCreateInput>
    /**
     * In case the ResourceLike was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResourceLikeUpdateInput, ResourceLikeUncheckedUpdateInput>
  }

  /**
   * ResourceLike delete
   */
  export type ResourceLikeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceLike
     */
    select?: ResourceLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceLike
     */
    omit?: ResourceLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceLikeInclude<ExtArgs> | null
    /**
     * Filter which ResourceLike to delete.
     */
    where: ResourceLikeWhereUniqueInput
  }

  /**
   * ResourceLike deleteMany
   */
  export type ResourceLikeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResourceLikes to delete
     */
    where?: ResourceLikeWhereInput
    /**
     * Limit how many ResourceLikes to delete.
     */
    limit?: number
  }

  /**
   * ResourceLike without action
   */
  export type ResourceLikeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceLike
     */
    select?: ResourceLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceLike
     */
    omit?: ResourceLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceLikeInclude<ExtArgs> | null
  }


  /**
   * Model ResourceReview
   */

  export type AggregateResourceReview = {
    _count: ResourceReviewCountAggregateOutputType | null
    _avg: ResourceReviewAvgAggregateOutputType | null
    _sum: ResourceReviewSumAggregateOutputType | null
    _min: ResourceReviewMinAggregateOutputType | null
    _max: ResourceReviewMaxAggregateOutputType | null
  }

  export type ResourceReviewAvgAggregateOutputType = {
    id: number | null
    resourceId: number | null
    userId: number | null
    rating: Decimal | null
  }

  export type ResourceReviewSumAggregateOutputType = {
    id: number | null
    resourceId: number | null
    userId: number | null
    rating: Decimal | null
  }

  export type ResourceReviewMinAggregateOutputType = {
    id: number | null
    resourceId: number | null
    userId: number | null
    rating: Decimal | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ResourceReviewMaxAggregateOutputType = {
    id: number | null
    resourceId: number | null
    userId: number | null
    rating: Decimal | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ResourceReviewCountAggregateOutputType = {
    id: number
    resourceId: number
    userId: number
    rating: number
    content: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ResourceReviewAvgAggregateInputType = {
    id?: true
    resourceId?: true
    userId?: true
    rating?: true
  }

  export type ResourceReviewSumAggregateInputType = {
    id?: true
    resourceId?: true
    userId?: true
    rating?: true
  }

  export type ResourceReviewMinAggregateInputType = {
    id?: true
    resourceId?: true
    userId?: true
    rating?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ResourceReviewMaxAggregateInputType = {
    id?: true
    resourceId?: true
    userId?: true
    rating?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ResourceReviewCountAggregateInputType = {
    id?: true
    resourceId?: true
    userId?: true
    rating?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ResourceReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResourceReview to aggregate.
     */
    where?: ResourceReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceReviews to fetch.
     */
    orderBy?: ResourceReviewOrderByWithRelationInput | ResourceReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResourceReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ResourceReviews
    **/
    _count?: true | ResourceReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResourceReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResourceReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResourceReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResourceReviewMaxAggregateInputType
  }

  export type GetResourceReviewAggregateType<T extends ResourceReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateResourceReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResourceReview[P]>
      : GetScalarType<T[P], AggregateResourceReview[P]>
  }




  export type ResourceReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResourceReviewWhereInput
    orderBy?: ResourceReviewOrderByWithAggregationInput | ResourceReviewOrderByWithAggregationInput[]
    by: ResourceReviewScalarFieldEnum[] | ResourceReviewScalarFieldEnum
    having?: ResourceReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResourceReviewCountAggregateInputType | true
    _avg?: ResourceReviewAvgAggregateInputType
    _sum?: ResourceReviewSumAggregateInputType
    _min?: ResourceReviewMinAggregateInputType
    _max?: ResourceReviewMaxAggregateInputType
  }

  export type ResourceReviewGroupByOutputType = {
    id: number
    resourceId: number
    userId: number
    rating: Decimal
    content: string | null
    createdAt: Date
    updatedAt: Date
    _count: ResourceReviewCountAggregateOutputType | null
    _avg: ResourceReviewAvgAggregateOutputType | null
    _sum: ResourceReviewSumAggregateOutputType | null
    _min: ResourceReviewMinAggregateOutputType | null
    _max: ResourceReviewMaxAggregateOutputType | null
  }

  type GetResourceReviewGroupByPayload<T extends ResourceReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResourceReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResourceReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResourceReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ResourceReviewGroupByOutputType[P]>
        }
      >
    >


  export type ResourceReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resourceId?: boolean
    userId?: boolean
    rating?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resourceReview"]>

  export type ResourceReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resourceId?: boolean
    userId?: boolean
    rating?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resourceReview"]>

  export type ResourceReviewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resourceId?: boolean
    userId?: boolean
    rating?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resourceReview"]>

  export type ResourceReviewSelectScalar = {
    id?: boolean
    resourceId?: boolean
    userId?: boolean
    rating?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ResourceReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "resourceId" | "userId" | "rating" | "content" | "createdAt" | "updatedAt", ExtArgs["result"]["resourceReview"]>
  export type ResourceReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ResourceReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ResourceReviewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    resource?: boolean | ResourceDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ResourceReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ResourceReview"
    objects: {
      resource: Prisma.$ResourcePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      resourceId: number
      userId: number
      rating: Prisma.Decimal
      content: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["resourceReview"]>
    composites: {}
  }

  type ResourceReviewGetPayload<S extends boolean | null | undefined | ResourceReviewDefaultArgs> = $Result.GetResult<Prisma.$ResourceReviewPayload, S>

  type ResourceReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResourceReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResourceReviewCountAggregateInputType | true
    }

  export interface ResourceReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ResourceReview'], meta: { name: 'ResourceReview' } }
    /**
     * Find zero or one ResourceReview that matches the filter.
     * @param {ResourceReviewFindUniqueArgs} args - Arguments to find a ResourceReview
     * @example
     * // Get one ResourceReview
     * const resourceReview = await prisma.resourceReview.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResourceReviewFindUniqueArgs>(args: SelectSubset<T, ResourceReviewFindUniqueArgs<ExtArgs>>): Prisma__ResourceReviewClient<$Result.GetResult<Prisma.$ResourceReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ResourceReview that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResourceReviewFindUniqueOrThrowArgs} args - Arguments to find a ResourceReview
     * @example
     * // Get one ResourceReview
     * const resourceReview = await prisma.resourceReview.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResourceReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ResourceReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResourceReviewClient<$Result.GetResult<Prisma.$ResourceReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResourceReview that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceReviewFindFirstArgs} args - Arguments to find a ResourceReview
     * @example
     * // Get one ResourceReview
     * const resourceReview = await prisma.resourceReview.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResourceReviewFindFirstArgs>(args?: SelectSubset<T, ResourceReviewFindFirstArgs<ExtArgs>>): Prisma__ResourceReviewClient<$Result.GetResult<Prisma.$ResourceReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResourceReview that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceReviewFindFirstOrThrowArgs} args - Arguments to find a ResourceReview
     * @example
     * // Get one ResourceReview
     * const resourceReview = await prisma.resourceReview.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResourceReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ResourceReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResourceReviewClient<$Result.GetResult<Prisma.$ResourceReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ResourceReviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResourceReviews
     * const resourceReviews = await prisma.resourceReview.findMany()
     * 
     * // Get first 10 ResourceReviews
     * const resourceReviews = await prisma.resourceReview.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resourceReviewWithIdOnly = await prisma.resourceReview.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResourceReviewFindManyArgs>(args?: SelectSubset<T, ResourceReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ResourceReview.
     * @param {ResourceReviewCreateArgs} args - Arguments to create a ResourceReview.
     * @example
     * // Create one ResourceReview
     * const ResourceReview = await prisma.resourceReview.create({
     *   data: {
     *     // ... data to create a ResourceReview
     *   }
     * })
     * 
     */
    create<T extends ResourceReviewCreateArgs>(args: SelectSubset<T, ResourceReviewCreateArgs<ExtArgs>>): Prisma__ResourceReviewClient<$Result.GetResult<Prisma.$ResourceReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ResourceReviews.
     * @param {ResourceReviewCreateManyArgs} args - Arguments to create many ResourceReviews.
     * @example
     * // Create many ResourceReviews
     * const resourceReview = await prisma.resourceReview.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResourceReviewCreateManyArgs>(args?: SelectSubset<T, ResourceReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ResourceReviews and returns the data saved in the database.
     * @param {ResourceReviewCreateManyAndReturnArgs} args - Arguments to create many ResourceReviews.
     * @example
     * // Create many ResourceReviews
     * const resourceReview = await prisma.resourceReview.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ResourceReviews and only return the `id`
     * const resourceReviewWithIdOnly = await prisma.resourceReview.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResourceReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, ResourceReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ResourceReview.
     * @param {ResourceReviewDeleteArgs} args - Arguments to delete one ResourceReview.
     * @example
     * // Delete one ResourceReview
     * const ResourceReview = await prisma.resourceReview.delete({
     *   where: {
     *     // ... filter to delete one ResourceReview
     *   }
     * })
     * 
     */
    delete<T extends ResourceReviewDeleteArgs>(args: SelectSubset<T, ResourceReviewDeleteArgs<ExtArgs>>): Prisma__ResourceReviewClient<$Result.GetResult<Prisma.$ResourceReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ResourceReview.
     * @param {ResourceReviewUpdateArgs} args - Arguments to update one ResourceReview.
     * @example
     * // Update one ResourceReview
     * const resourceReview = await prisma.resourceReview.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResourceReviewUpdateArgs>(args: SelectSubset<T, ResourceReviewUpdateArgs<ExtArgs>>): Prisma__ResourceReviewClient<$Result.GetResult<Prisma.$ResourceReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ResourceReviews.
     * @param {ResourceReviewDeleteManyArgs} args - Arguments to filter ResourceReviews to delete.
     * @example
     * // Delete a few ResourceReviews
     * const { count } = await prisma.resourceReview.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResourceReviewDeleteManyArgs>(args?: SelectSubset<T, ResourceReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResourceReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResourceReviews
     * const resourceReview = await prisma.resourceReview.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResourceReviewUpdateManyArgs>(args: SelectSubset<T, ResourceReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResourceReviews and returns the data updated in the database.
     * @param {ResourceReviewUpdateManyAndReturnArgs} args - Arguments to update many ResourceReviews.
     * @example
     * // Update many ResourceReviews
     * const resourceReview = await prisma.resourceReview.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ResourceReviews and only return the `id`
     * const resourceReviewWithIdOnly = await prisma.resourceReview.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResourceReviewUpdateManyAndReturnArgs>(args: SelectSubset<T, ResourceReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResourceReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ResourceReview.
     * @param {ResourceReviewUpsertArgs} args - Arguments to update or create a ResourceReview.
     * @example
     * // Update or create a ResourceReview
     * const resourceReview = await prisma.resourceReview.upsert({
     *   create: {
     *     // ... data to create a ResourceReview
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResourceReview we want to update
     *   }
     * })
     */
    upsert<T extends ResourceReviewUpsertArgs>(args: SelectSubset<T, ResourceReviewUpsertArgs<ExtArgs>>): Prisma__ResourceReviewClient<$Result.GetResult<Prisma.$ResourceReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ResourceReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceReviewCountArgs} args - Arguments to filter ResourceReviews to count.
     * @example
     * // Count the number of ResourceReviews
     * const count = await prisma.resourceReview.count({
     *   where: {
     *     // ... the filter for the ResourceReviews we want to count
     *   }
     * })
    **/
    count<T extends ResourceReviewCountArgs>(
      args?: Subset<T, ResourceReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResourceReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ResourceReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResourceReviewAggregateArgs>(args: Subset<T, ResourceReviewAggregateArgs>): Prisma.PrismaPromise<GetResourceReviewAggregateType<T>>

    /**
     * Group by ResourceReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResourceReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResourceReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResourceReviewGroupByArgs['orderBy'] }
        : { orderBy?: ResourceReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResourceReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResourceReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ResourceReview model
   */
  readonly fields: ResourceReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ResourceReview.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResourceReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    resource<T extends ResourceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ResourceDefaultArgs<ExtArgs>>): Prisma__ResourceClient<$Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ResourceReview model
   */
  interface ResourceReviewFieldRefs {
    readonly id: FieldRef<"ResourceReview", 'Int'>
    readonly resourceId: FieldRef<"ResourceReview", 'Int'>
    readonly userId: FieldRef<"ResourceReview", 'Int'>
    readonly rating: FieldRef<"ResourceReview", 'Decimal'>
    readonly content: FieldRef<"ResourceReview", 'String'>
    readonly createdAt: FieldRef<"ResourceReview", 'DateTime'>
    readonly updatedAt: FieldRef<"ResourceReview", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ResourceReview findUnique
   */
  export type ResourceReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceReview
     */
    select?: ResourceReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceReview
     */
    omit?: ResourceReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceReviewInclude<ExtArgs> | null
    /**
     * Filter, which ResourceReview to fetch.
     */
    where: ResourceReviewWhereUniqueInput
  }

  /**
   * ResourceReview findUniqueOrThrow
   */
  export type ResourceReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceReview
     */
    select?: ResourceReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceReview
     */
    omit?: ResourceReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceReviewInclude<ExtArgs> | null
    /**
     * Filter, which ResourceReview to fetch.
     */
    where: ResourceReviewWhereUniqueInput
  }

  /**
   * ResourceReview findFirst
   */
  export type ResourceReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceReview
     */
    select?: ResourceReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceReview
     */
    omit?: ResourceReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceReviewInclude<ExtArgs> | null
    /**
     * Filter, which ResourceReview to fetch.
     */
    where?: ResourceReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceReviews to fetch.
     */
    orderBy?: ResourceReviewOrderByWithRelationInput | ResourceReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResourceReviews.
     */
    cursor?: ResourceReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResourceReviews.
     */
    distinct?: ResourceReviewScalarFieldEnum | ResourceReviewScalarFieldEnum[]
  }

  /**
   * ResourceReview findFirstOrThrow
   */
  export type ResourceReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceReview
     */
    select?: ResourceReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceReview
     */
    omit?: ResourceReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceReviewInclude<ExtArgs> | null
    /**
     * Filter, which ResourceReview to fetch.
     */
    where?: ResourceReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceReviews to fetch.
     */
    orderBy?: ResourceReviewOrderByWithRelationInput | ResourceReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResourceReviews.
     */
    cursor?: ResourceReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResourceReviews.
     */
    distinct?: ResourceReviewScalarFieldEnum | ResourceReviewScalarFieldEnum[]
  }

  /**
   * ResourceReview findMany
   */
  export type ResourceReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceReview
     */
    select?: ResourceReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceReview
     */
    omit?: ResourceReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceReviewInclude<ExtArgs> | null
    /**
     * Filter, which ResourceReviews to fetch.
     */
    where?: ResourceReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResourceReviews to fetch.
     */
    orderBy?: ResourceReviewOrderByWithRelationInput | ResourceReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ResourceReviews.
     */
    cursor?: ResourceReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResourceReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResourceReviews.
     */
    skip?: number
    distinct?: ResourceReviewScalarFieldEnum | ResourceReviewScalarFieldEnum[]
  }

  /**
   * ResourceReview create
   */
  export type ResourceReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceReview
     */
    select?: ResourceReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceReview
     */
    omit?: ResourceReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a ResourceReview.
     */
    data: XOR<ResourceReviewCreateInput, ResourceReviewUncheckedCreateInput>
  }

  /**
   * ResourceReview createMany
   */
  export type ResourceReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResourceReviews.
     */
    data: ResourceReviewCreateManyInput | ResourceReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ResourceReview createManyAndReturn
   */
  export type ResourceReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceReview
     */
    select?: ResourceReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceReview
     */
    omit?: ResourceReviewOmit<ExtArgs> | null
    /**
     * The data used to create many ResourceReviews.
     */
    data: ResourceReviewCreateManyInput | ResourceReviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResourceReview update
   */
  export type ResourceReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceReview
     */
    select?: ResourceReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceReview
     */
    omit?: ResourceReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a ResourceReview.
     */
    data: XOR<ResourceReviewUpdateInput, ResourceReviewUncheckedUpdateInput>
    /**
     * Choose, which ResourceReview to update.
     */
    where: ResourceReviewWhereUniqueInput
  }

  /**
   * ResourceReview updateMany
   */
  export type ResourceReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ResourceReviews.
     */
    data: XOR<ResourceReviewUpdateManyMutationInput, ResourceReviewUncheckedUpdateManyInput>
    /**
     * Filter which ResourceReviews to update
     */
    where?: ResourceReviewWhereInput
    /**
     * Limit how many ResourceReviews to update.
     */
    limit?: number
  }

  /**
   * ResourceReview updateManyAndReturn
   */
  export type ResourceReviewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceReview
     */
    select?: ResourceReviewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceReview
     */
    omit?: ResourceReviewOmit<ExtArgs> | null
    /**
     * The data used to update ResourceReviews.
     */
    data: XOR<ResourceReviewUpdateManyMutationInput, ResourceReviewUncheckedUpdateManyInput>
    /**
     * Filter which ResourceReviews to update
     */
    where?: ResourceReviewWhereInput
    /**
     * Limit how many ResourceReviews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceReviewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResourceReview upsert
   */
  export type ResourceReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceReview
     */
    select?: ResourceReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceReview
     */
    omit?: ResourceReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the ResourceReview to update in case it exists.
     */
    where: ResourceReviewWhereUniqueInput
    /**
     * In case the ResourceReview found by the `where` argument doesn't exist, create a new ResourceReview with this data.
     */
    create: XOR<ResourceReviewCreateInput, ResourceReviewUncheckedCreateInput>
    /**
     * In case the ResourceReview was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResourceReviewUpdateInput, ResourceReviewUncheckedUpdateInput>
  }

  /**
   * ResourceReview delete
   */
  export type ResourceReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceReview
     */
    select?: ResourceReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceReview
     */
    omit?: ResourceReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceReviewInclude<ExtArgs> | null
    /**
     * Filter which ResourceReview to delete.
     */
    where: ResourceReviewWhereUniqueInput
  }

  /**
   * ResourceReview deleteMany
   */
  export type ResourceReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResourceReviews to delete
     */
    where?: ResourceReviewWhereInput
    /**
     * Limit how many ResourceReviews to delete.
     */
    limit?: number
  }

  /**
   * ResourceReview without action
   */
  export type ResourceReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResourceReview
     */
    select?: ResourceReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResourceReview
     */
    omit?: ResourceReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResourceReviewInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    password: 'password',
    image: 'image',
    role: 'role',
    isVerified: 'isVerified',
    forgotPasswordToken: 'forgotPasswordToken',
    forgotPasswordTokenExpiry: 'forgotPasswordTokenExpiry',
    verifyToken: 'verifyToken',
    verifyTokenExpiry: 'verifyTokenExpiry',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const LocationScalarFieldEnum: {
    id: 'id',
    resourceId: 'resourceId',
    latitude: 'latitude',
    longitude: 'longitude'
  };

  export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum]


  export const ResourceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    address: 'address',
    city: 'city',
    openDays: 'openDays',
    openTime: 'openTime',
    closeTime: 'closeTime',
    phone: 'phone',
    rating: 'rating',
    imageUrl: 'imageUrl',
    facebookLink: 'facebookLink',
    email: 'email',
    status: 'status',
    url: 'url',
    categoryId: 'categoryId',
    createdById: 'createdById',
    createdAt: 'createdAt'
  };

  export type ResourceScalarFieldEnum = (typeof ResourceScalarFieldEnum)[keyof typeof ResourceScalarFieldEnum]


  export const ResourceCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type ResourceCategoryScalarFieldEnum = (typeof ResourceCategoryScalarFieldEnum)[keyof typeof ResourceCategoryScalarFieldEnum]


  export const ResourceEditSuggestionScalarFieldEnum: {
    id: 'id',
    resourceId: 'resourceId',
    suggestedById: 'suggestedById',
    name: 'name',
    categoryId: 'categoryId',
    address: 'address',
    openDays: 'openDays',
    openTime: 'openTime',
    closeTime: 'closeTime',
    phone: 'phone',
    url: 'url',
    createdAt: 'createdAt',
    status: 'status'
  };

  export type ResourceEditSuggestionScalarFieldEnum = (typeof ResourceEditSuggestionScalarFieldEnum)[keyof typeof ResourceEditSuggestionScalarFieldEnum]


  export const ResourceLikeScalarFieldEnum: {
    id: 'id',
    resourceId: 'resourceId',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type ResourceLikeScalarFieldEnum = (typeof ResourceLikeScalarFieldEnum)[keyof typeof ResourceLikeScalarFieldEnum]


  export const ResourceReviewScalarFieldEnum: {
    id: 'id',
    resourceId: 'resourceId',
    userId: 'userId',
    rating: 'rating',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ResourceReviewScalarFieldEnum = (typeof ResourceReviewScalarFieldEnum)[keyof typeof ResourceReviewScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'ResourceStatus'
   */
  export type EnumResourceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ResourceStatus'>
    


  /**
   * Reference to a field of type 'ResourceStatus[]'
   */
  export type ListEnumResourceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ResourceStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isVerified?: BoolFilter<"User"> | boolean
    forgotPasswordToken?: StringNullableFilter<"User"> | string | null
    forgotPasswordTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    verifyToken?: StringNullableFilter<"User"> | string | null
    verifyTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    resources?: ResourceListRelationFilter
    ResourceEditSuggestion?: ResourceEditSuggestionListRelationFilter
    likes?: ResourceLikeListRelationFilter
    reviews?: ResourceReviewListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    forgotPasswordToken?: SortOrderInput | SortOrder
    forgotPasswordTokenExpiry?: SortOrderInput | SortOrder
    verifyToken?: SortOrderInput | SortOrder
    verifyTokenExpiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resources?: ResourceOrderByRelationAggregateInput
    ResourceEditSuggestion?: ResourceEditSuggestionOrderByRelationAggregateInput
    likes?: ResourceLikeOrderByRelationAggregateInput
    reviews?: ResourceReviewOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    image?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isVerified?: BoolFilter<"User"> | boolean
    forgotPasswordToken?: StringNullableFilter<"User"> | string | null
    forgotPasswordTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    verifyToken?: StringNullableFilter<"User"> | string | null
    verifyTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    resources?: ResourceListRelationFilter
    ResourceEditSuggestion?: ResourceEditSuggestionListRelationFilter
    likes?: ResourceLikeListRelationFilter
    reviews?: ResourceReviewListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    forgotPasswordToken?: SortOrderInput | SortOrder
    forgotPasswordTokenExpiry?: SortOrderInput | SortOrder
    verifyToken?: SortOrderInput | SortOrder
    verifyTokenExpiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    isVerified?: BoolWithAggregatesFilter<"User"> | boolean
    forgotPasswordToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    forgotPasswordTokenExpiry?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    verifyToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    verifyTokenExpiry?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type LocationWhereInput = {
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    id?: IntFilter<"Location"> | number
    resourceId?: IntFilter<"Location"> | number
    latitude?: FloatFilter<"Location"> | number
    longitude?: FloatFilter<"Location"> | number
    Resource?: XOR<ResourceScalarRelationFilter, ResourceWhereInput>
  }

  export type LocationOrderByWithRelationInput = {
    id?: SortOrder
    resourceId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    Resource?: ResourceOrderByWithRelationInput
  }

  export type LocationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    resourceId?: IntFilter<"Location"> | number
    latitude?: FloatFilter<"Location"> | number
    longitude?: FloatFilter<"Location"> | number
    Resource?: XOR<ResourceScalarRelationFilter, ResourceWhereInput>
  }, "id">

  export type LocationOrderByWithAggregationInput = {
    id?: SortOrder
    resourceId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    _count?: LocationCountOrderByAggregateInput
    _avg?: LocationAvgOrderByAggregateInput
    _max?: LocationMaxOrderByAggregateInput
    _min?: LocationMinOrderByAggregateInput
    _sum?: LocationSumOrderByAggregateInput
  }

  export type LocationScalarWhereWithAggregatesInput = {
    AND?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    OR?: LocationScalarWhereWithAggregatesInput[]
    NOT?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Location"> | number
    resourceId?: IntWithAggregatesFilter<"Location"> | number
    latitude?: FloatWithAggregatesFilter<"Location"> | number
    longitude?: FloatWithAggregatesFilter<"Location"> | number
  }

  export type ResourceWhereInput = {
    AND?: ResourceWhereInput | ResourceWhereInput[]
    OR?: ResourceWhereInput[]
    NOT?: ResourceWhereInput | ResourceWhereInput[]
    id?: IntFilter<"Resource"> | number
    name?: StringFilter<"Resource"> | string
    description?: StringNullableFilter<"Resource"> | string | null
    address?: StringFilter<"Resource"> | string
    city?: StringNullableFilter<"Resource"> | string | null
    openDays?: StringNullableFilter<"Resource"> | string | null
    openTime?: DateTimeNullableFilter<"Resource"> | Date | string | null
    closeTime?: DateTimeNullableFilter<"Resource"> | Date | string | null
    phone?: StringNullableFilter<"Resource"> | string | null
    rating?: DecimalFilter<"Resource"> | Decimal | DecimalJsLike | number | string
    imageUrl?: StringNullableFilter<"Resource"> | string | null
    facebookLink?: StringNullableFilter<"Resource"> | string | null
    email?: StringNullableFilter<"Resource"> | string | null
    status?: EnumResourceStatusFilter<"Resource"> | $Enums.ResourceStatus
    url?: StringNullableFilter<"Resource"> | string | null
    categoryId?: IntNullableFilter<"Resource"> | number | null
    createdById?: IntNullableFilter<"Resource"> | number | null
    createdAt?: DateTimeFilter<"Resource"> | Date | string
    Location?: LocationListRelationFilter
    ResourceCategory?: XOR<ResourceCategoryNullableScalarRelationFilter, ResourceCategoryWhereInput> | null
    User?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    ResourceEditSuggestion?: ResourceEditSuggestionListRelationFilter
    ResourceLike?: ResourceLikeListRelationFilter
    ResourceReview?: ResourceReviewListRelationFilter
  }

  export type ResourceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    address?: SortOrder
    city?: SortOrderInput | SortOrder
    openDays?: SortOrderInput | SortOrder
    openTime?: SortOrderInput | SortOrder
    closeTime?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    rating?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    facebookLink?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    status?: SortOrder
    url?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    createdById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    Location?: LocationOrderByRelationAggregateInput
    ResourceCategory?: ResourceCategoryOrderByWithRelationInput
    User?: UserOrderByWithRelationInput
    ResourceEditSuggestion?: ResourceEditSuggestionOrderByRelationAggregateInput
    ResourceLike?: ResourceLikeOrderByRelationAggregateInput
    ResourceReview?: ResourceReviewOrderByRelationAggregateInput
  }

  export type ResourceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ResourceWhereInput | ResourceWhereInput[]
    OR?: ResourceWhereInput[]
    NOT?: ResourceWhereInput | ResourceWhereInput[]
    name?: StringFilter<"Resource"> | string
    description?: StringNullableFilter<"Resource"> | string | null
    address?: StringFilter<"Resource"> | string
    city?: StringNullableFilter<"Resource"> | string | null
    openDays?: StringNullableFilter<"Resource"> | string | null
    openTime?: DateTimeNullableFilter<"Resource"> | Date | string | null
    closeTime?: DateTimeNullableFilter<"Resource"> | Date | string | null
    phone?: StringNullableFilter<"Resource"> | string | null
    rating?: DecimalFilter<"Resource"> | Decimal | DecimalJsLike | number | string
    imageUrl?: StringNullableFilter<"Resource"> | string | null
    facebookLink?: StringNullableFilter<"Resource"> | string | null
    email?: StringNullableFilter<"Resource"> | string | null
    status?: EnumResourceStatusFilter<"Resource"> | $Enums.ResourceStatus
    url?: StringNullableFilter<"Resource"> | string | null
    categoryId?: IntNullableFilter<"Resource"> | number | null
    createdById?: IntNullableFilter<"Resource"> | number | null
    createdAt?: DateTimeFilter<"Resource"> | Date | string
    Location?: LocationListRelationFilter
    ResourceCategory?: XOR<ResourceCategoryNullableScalarRelationFilter, ResourceCategoryWhereInput> | null
    User?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    ResourceEditSuggestion?: ResourceEditSuggestionListRelationFilter
    ResourceLike?: ResourceLikeListRelationFilter
    ResourceReview?: ResourceReviewListRelationFilter
  }, "id">

  export type ResourceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    address?: SortOrder
    city?: SortOrderInput | SortOrder
    openDays?: SortOrderInput | SortOrder
    openTime?: SortOrderInput | SortOrder
    closeTime?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    rating?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    facebookLink?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    status?: SortOrder
    url?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    createdById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ResourceCountOrderByAggregateInput
    _avg?: ResourceAvgOrderByAggregateInput
    _max?: ResourceMaxOrderByAggregateInput
    _min?: ResourceMinOrderByAggregateInput
    _sum?: ResourceSumOrderByAggregateInput
  }

  export type ResourceScalarWhereWithAggregatesInput = {
    AND?: ResourceScalarWhereWithAggregatesInput | ResourceScalarWhereWithAggregatesInput[]
    OR?: ResourceScalarWhereWithAggregatesInput[]
    NOT?: ResourceScalarWhereWithAggregatesInput | ResourceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Resource"> | number
    name?: StringWithAggregatesFilter<"Resource"> | string
    description?: StringNullableWithAggregatesFilter<"Resource"> | string | null
    address?: StringWithAggregatesFilter<"Resource"> | string
    city?: StringNullableWithAggregatesFilter<"Resource"> | string | null
    openDays?: StringNullableWithAggregatesFilter<"Resource"> | string | null
    openTime?: DateTimeNullableWithAggregatesFilter<"Resource"> | Date | string | null
    closeTime?: DateTimeNullableWithAggregatesFilter<"Resource"> | Date | string | null
    phone?: StringNullableWithAggregatesFilter<"Resource"> | string | null
    rating?: DecimalWithAggregatesFilter<"Resource"> | Decimal | DecimalJsLike | number | string
    imageUrl?: StringNullableWithAggregatesFilter<"Resource"> | string | null
    facebookLink?: StringNullableWithAggregatesFilter<"Resource"> | string | null
    email?: StringNullableWithAggregatesFilter<"Resource"> | string | null
    status?: EnumResourceStatusWithAggregatesFilter<"Resource"> | $Enums.ResourceStatus
    url?: StringNullableWithAggregatesFilter<"Resource"> | string | null
    categoryId?: IntNullableWithAggregatesFilter<"Resource"> | number | null
    createdById?: IntNullableWithAggregatesFilter<"Resource"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Resource"> | Date | string
  }

  export type ResourceCategoryWhereInput = {
    AND?: ResourceCategoryWhereInput | ResourceCategoryWhereInput[]
    OR?: ResourceCategoryWhereInput[]
    NOT?: ResourceCategoryWhereInput | ResourceCategoryWhereInput[]
    id?: IntFilter<"ResourceCategory"> | number
    name?: StringFilter<"ResourceCategory"> | string
    Resource?: ResourceListRelationFilter
    ResourceEditSuggestion?: ResourceEditSuggestionListRelationFilter
  }

  export type ResourceCategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    Resource?: ResourceOrderByRelationAggregateInput
    ResourceEditSuggestion?: ResourceEditSuggestionOrderByRelationAggregateInput
  }

  export type ResourceCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: ResourceCategoryWhereInput | ResourceCategoryWhereInput[]
    OR?: ResourceCategoryWhereInput[]
    NOT?: ResourceCategoryWhereInput | ResourceCategoryWhereInput[]
    Resource?: ResourceListRelationFilter
    ResourceEditSuggestion?: ResourceEditSuggestionListRelationFilter
  }, "id" | "name">

  export type ResourceCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: ResourceCategoryCountOrderByAggregateInput
    _avg?: ResourceCategoryAvgOrderByAggregateInput
    _max?: ResourceCategoryMaxOrderByAggregateInput
    _min?: ResourceCategoryMinOrderByAggregateInput
    _sum?: ResourceCategorySumOrderByAggregateInput
  }

  export type ResourceCategoryScalarWhereWithAggregatesInput = {
    AND?: ResourceCategoryScalarWhereWithAggregatesInput | ResourceCategoryScalarWhereWithAggregatesInput[]
    OR?: ResourceCategoryScalarWhereWithAggregatesInput[]
    NOT?: ResourceCategoryScalarWhereWithAggregatesInput | ResourceCategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ResourceCategory"> | number
    name?: StringWithAggregatesFilter<"ResourceCategory"> | string
  }

  export type ResourceEditSuggestionWhereInput = {
    AND?: ResourceEditSuggestionWhereInput | ResourceEditSuggestionWhereInput[]
    OR?: ResourceEditSuggestionWhereInput[]
    NOT?: ResourceEditSuggestionWhereInput | ResourceEditSuggestionWhereInput[]
    id?: IntFilter<"ResourceEditSuggestion"> | number
    resourceId?: IntFilter<"ResourceEditSuggestion"> | number
    suggestedById?: IntNullableFilter<"ResourceEditSuggestion"> | number | null
    name?: StringNullableFilter<"ResourceEditSuggestion"> | string | null
    categoryId?: IntNullableFilter<"ResourceEditSuggestion"> | number | null
    address?: StringNullableFilter<"ResourceEditSuggestion"> | string | null
    openDays?: StringNullableFilter<"ResourceEditSuggestion"> | string | null
    openTime?: DateTimeNullableFilter<"ResourceEditSuggestion"> | Date | string | null
    closeTime?: DateTimeNullableFilter<"ResourceEditSuggestion"> | Date | string | null
    phone?: StringNullableFilter<"ResourceEditSuggestion"> | string | null
    url?: StringNullableFilter<"ResourceEditSuggestion"> | string | null
    createdAt?: DateTimeFilter<"ResourceEditSuggestion"> | Date | string
    status?: EnumResourceStatusFilter<"ResourceEditSuggestion"> | $Enums.ResourceStatus
    ResourceCategory?: XOR<ResourceCategoryNullableScalarRelationFilter, ResourceCategoryWhereInput> | null
    resource?: XOR<ResourceScalarRelationFilter, ResourceWhereInput>
    User?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ResourceEditSuggestionOrderByWithRelationInput = {
    id?: SortOrder
    resourceId?: SortOrder
    suggestedById?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    openDays?: SortOrderInput | SortOrder
    openTime?: SortOrderInput | SortOrder
    closeTime?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    status?: SortOrder
    ResourceCategory?: ResourceCategoryOrderByWithRelationInput
    resource?: ResourceOrderByWithRelationInput
    User?: UserOrderByWithRelationInput
  }

  export type ResourceEditSuggestionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ResourceEditSuggestionWhereInput | ResourceEditSuggestionWhereInput[]
    OR?: ResourceEditSuggestionWhereInput[]
    NOT?: ResourceEditSuggestionWhereInput | ResourceEditSuggestionWhereInput[]
    resourceId?: IntFilter<"ResourceEditSuggestion"> | number
    suggestedById?: IntNullableFilter<"ResourceEditSuggestion"> | number | null
    name?: StringNullableFilter<"ResourceEditSuggestion"> | string | null
    categoryId?: IntNullableFilter<"ResourceEditSuggestion"> | number | null
    address?: StringNullableFilter<"ResourceEditSuggestion"> | string | null
    openDays?: StringNullableFilter<"ResourceEditSuggestion"> | string | null
    openTime?: DateTimeNullableFilter<"ResourceEditSuggestion"> | Date | string | null
    closeTime?: DateTimeNullableFilter<"ResourceEditSuggestion"> | Date | string | null
    phone?: StringNullableFilter<"ResourceEditSuggestion"> | string | null
    url?: StringNullableFilter<"ResourceEditSuggestion"> | string | null
    createdAt?: DateTimeFilter<"ResourceEditSuggestion"> | Date | string
    status?: EnumResourceStatusFilter<"ResourceEditSuggestion"> | $Enums.ResourceStatus
    ResourceCategory?: XOR<ResourceCategoryNullableScalarRelationFilter, ResourceCategoryWhereInput> | null
    resource?: XOR<ResourceScalarRelationFilter, ResourceWhereInput>
    User?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type ResourceEditSuggestionOrderByWithAggregationInput = {
    id?: SortOrder
    resourceId?: SortOrder
    suggestedById?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    openDays?: SortOrderInput | SortOrder
    openTime?: SortOrderInput | SortOrder
    closeTime?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    status?: SortOrder
    _count?: ResourceEditSuggestionCountOrderByAggregateInput
    _avg?: ResourceEditSuggestionAvgOrderByAggregateInput
    _max?: ResourceEditSuggestionMaxOrderByAggregateInput
    _min?: ResourceEditSuggestionMinOrderByAggregateInput
    _sum?: ResourceEditSuggestionSumOrderByAggregateInput
  }

  export type ResourceEditSuggestionScalarWhereWithAggregatesInput = {
    AND?: ResourceEditSuggestionScalarWhereWithAggregatesInput | ResourceEditSuggestionScalarWhereWithAggregatesInput[]
    OR?: ResourceEditSuggestionScalarWhereWithAggregatesInput[]
    NOT?: ResourceEditSuggestionScalarWhereWithAggregatesInput | ResourceEditSuggestionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ResourceEditSuggestion"> | number
    resourceId?: IntWithAggregatesFilter<"ResourceEditSuggestion"> | number
    suggestedById?: IntNullableWithAggregatesFilter<"ResourceEditSuggestion"> | number | null
    name?: StringNullableWithAggregatesFilter<"ResourceEditSuggestion"> | string | null
    categoryId?: IntNullableWithAggregatesFilter<"ResourceEditSuggestion"> | number | null
    address?: StringNullableWithAggregatesFilter<"ResourceEditSuggestion"> | string | null
    openDays?: StringNullableWithAggregatesFilter<"ResourceEditSuggestion"> | string | null
    openTime?: DateTimeNullableWithAggregatesFilter<"ResourceEditSuggestion"> | Date | string | null
    closeTime?: DateTimeNullableWithAggregatesFilter<"ResourceEditSuggestion"> | Date | string | null
    phone?: StringNullableWithAggregatesFilter<"ResourceEditSuggestion"> | string | null
    url?: StringNullableWithAggregatesFilter<"ResourceEditSuggestion"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ResourceEditSuggestion"> | Date | string
    status?: EnumResourceStatusWithAggregatesFilter<"ResourceEditSuggestion"> | $Enums.ResourceStatus
  }

  export type ResourceLikeWhereInput = {
    AND?: ResourceLikeWhereInput | ResourceLikeWhereInput[]
    OR?: ResourceLikeWhereInput[]
    NOT?: ResourceLikeWhereInput | ResourceLikeWhereInput[]
    id?: IntFilter<"ResourceLike"> | number
    resourceId?: IntFilter<"ResourceLike"> | number
    userId?: IntFilter<"ResourceLike"> | number
    createdAt?: DateTimeFilter<"ResourceLike"> | Date | string
    resource?: XOR<ResourceScalarRelationFilter, ResourceWhereInput>
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ResourceLikeOrderByWithRelationInput = {
    id?: SortOrder
    resourceId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    resource?: ResourceOrderByWithRelationInput
    User?: UserOrderByWithRelationInput
  }

  export type ResourceLikeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    resourceId_userId?: ResourceLikeResourceIdUserIdCompoundUniqueInput
    AND?: ResourceLikeWhereInput | ResourceLikeWhereInput[]
    OR?: ResourceLikeWhereInput[]
    NOT?: ResourceLikeWhereInput | ResourceLikeWhereInput[]
    resourceId?: IntFilter<"ResourceLike"> | number
    userId?: IntFilter<"ResourceLike"> | number
    createdAt?: DateTimeFilter<"ResourceLike"> | Date | string
    resource?: XOR<ResourceScalarRelationFilter, ResourceWhereInput>
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "resourceId_userId">

  export type ResourceLikeOrderByWithAggregationInput = {
    id?: SortOrder
    resourceId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    _count?: ResourceLikeCountOrderByAggregateInput
    _avg?: ResourceLikeAvgOrderByAggregateInput
    _max?: ResourceLikeMaxOrderByAggregateInput
    _min?: ResourceLikeMinOrderByAggregateInput
    _sum?: ResourceLikeSumOrderByAggregateInput
  }

  export type ResourceLikeScalarWhereWithAggregatesInput = {
    AND?: ResourceLikeScalarWhereWithAggregatesInput | ResourceLikeScalarWhereWithAggregatesInput[]
    OR?: ResourceLikeScalarWhereWithAggregatesInput[]
    NOT?: ResourceLikeScalarWhereWithAggregatesInput | ResourceLikeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ResourceLike"> | number
    resourceId?: IntWithAggregatesFilter<"ResourceLike"> | number
    userId?: IntWithAggregatesFilter<"ResourceLike"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ResourceLike"> | Date | string
  }

  export type ResourceReviewWhereInput = {
    AND?: ResourceReviewWhereInput | ResourceReviewWhereInput[]
    OR?: ResourceReviewWhereInput[]
    NOT?: ResourceReviewWhereInput | ResourceReviewWhereInput[]
    id?: IntFilter<"ResourceReview"> | number
    resourceId?: IntFilter<"ResourceReview"> | number
    userId?: IntFilter<"ResourceReview"> | number
    rating?: DecimalFilter<"ResourceReview"> | Decimal | DecimalJsLike | number | string
    content?: StringNullableFilter<"ResourceReview"> | string | null
    createdAt?: DateTimeFilter<"ResourceReview"> | Date | string
    updatedAt?: DateTimeFilter<"ResourceReview"> | Date | string
    resource?: XOR<ResourceScalarRelationFilter, ResourceWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ResourceReviewOrderByWithRelationInput = {
    id?: SortOrder
    resourceId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    content?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resource?: ResourceOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ResourceReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ResourceReviewWhereInput | ResourceReviewWhereInput[]
    OR?: ResourceReviewWhereInput[]
    NOT?: ResourceReviewWhereInput | ResourceReviewWhereInput[]
    resourceId?: IntFilter<"ResourceReview"> | number
    userId?: IntFilter<"ResourceReview"> | number
    rating?: DecimalFilter<"ResourceReview"> | Decimal | DecimalJsLike | number | string
    content?: StringNullableFilter<"ResourceReview"> | string | null
    createdAt?: DateTimeFilter<"ResourceReview"> | Date | string
    updatedAt?: DateTimeFilter<"ResourceReview"> | Date | string
    resource?: XOR<ResourceScalarRelationFilter, ResourceWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ResourceReviewOrderByWithAggregationInput = {
    id?: SortOrder
    resourceId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    content?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ResourceReviewCountOrderByAggregateInput
    _avg?: ResourceReviewAvgOrderByAggregateInput
    _max?: ResourceReviewMaxOrderByAggregateInput
    _min?: ResourceReviewMinOrderByAggregateInput
    _sum?: ResourceReviewSumOrderByAggregateInput
  }

  export type ResourceReviewScalarWhereWithAggregatesInput = {
    AND?: ResourceReviewScalarWhereWithAggregatesInput | ResourceReviewScalarWhereWithAggregatesInput[]
    OR?: ResourceReviewScalarWhereWithAggregatesInput[]
    NOT?: ResourceReviewScalarWhereWithAggregatesInput | ResourceReviewScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ResourceReview"> | number
    resourceId?: IntWithAggregatesFilter<"ResourceReview"> | number
    userId?: IntWithAggregatesFilter<"ResourceReview"> | number
    rating?: DecimalWithAggregatesFilter<"ResourceReview"> | Decimal | DecimalJsLike | number | string
    content?: StringNullableWithAggregatesFilter<"ResourceReview"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ResourceReview"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ResourceReview"> | Date | string
  }

  export type UserCreateInput = {
    firstName: string
    lastName: string
    email: string
    password: string
    image?: string | null
    role?: $Enums.Role
    isVerified?: boolean
    forgotPasswordToken?: string | null
    forgotPasswordTokenExpiry?: Date | string | null
    verifyToken?: string | null
    verifyTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resources?: ResourceCreateNestedManyWithoutUserInput
    ResourceEditSuggestion?: ResourceEditSuggestionCreateNestedManyWithoutUserInput
    likes?: ResourceLikeCreateNestedManyWithoutUserInput
    reviews?: ResourceReviewCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    firstName: string
    lastName: string
    email: string
    password: string
    image?: string | null
    role?: $Enums.Role
    isVerified?: boolean
    forgotPasswordToken?: string | null
    forgotPasswordTokenExpiry?: Date | string | null
    verifyToken?: string | null
    verifyTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resources?: ResourceUncheckedCreateNestedManyWithoutUserInput
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedCreateNestedManyWithoutUserInput
    likes?: ResourceLikeUncheckedCreateNestedManyWithoutUserInput
    reviews?: ResourceReviewUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    forgotPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    forgotPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifyToken?: NullableStringFieldUpdateOperationsInput | string | null
    verifyTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resources?: ResourceUpdateManyWithoutUserNestedInput
    ResourceEditSuggestion?: ResourceEditSuggestionUpdateManyWithoutUserNestedInput
    likes?: ResourceLikeUpdateManyWithoutUserNestedInput
    reviews?: ResourceReviewUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    forgotPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    forgotPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifyToken?: NullableStringFieldUpdateOperationsInput | string | null
    verifyTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resources?: ResourceUncheckedUpdateManyWithoutUserNestedInput
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedUpdateManyWithoutUserNestedInput
    likes?: ResourceLikeUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ResourceReviewUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    firstName: string
    lastName: string
    email: string
    password: string
    image?: string | null
    role?: $Enums.Role
    isVerified?: boolean
    forgotPasswordToken?: string | null
    forgotPasswordTokenExpiry?: Date | string | null
    verifyToken?: string | null
    verifyTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    forgotPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    forgotPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifyToken?: NullableStringFieldUpdateOperationsInput | string | null
    verifyTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    forgotPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    forgotPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifyToken?: NullableStringFieldUpdateOperationsInput | string | null
    verifyTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationCreateInput = {
    latitude: number
    longitude: number
    Resource: ResourceCreateNestedOneWithoutLocationInput
  }

  export type LocationUncheckedCreateInput = {
    id?: number
    resourceId: number
    latitude: number
    longitude: number
  }

  export type LocationUpdateInput = {
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    Resource?: ResourceUpdateOneRequiredWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    resourceId?: IntFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
  }

  export type LocationCreateManyInput = {
    id?: number
    resourceId: number
    latitude: number
    longitude: number
  }

  export type LocationUpdateManyMutationInput = {
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
  }

  export type LocationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    resourceId?: IntFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
  }

  export type ResourceCreateInput = {
    name: string
    description?: string | null
    address: string
    city?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    facebookLink?: string | null
    email?: string | null
    status?: $Enums.ResourceStatus
    url?: string | null
    createdAt?: Date | string
    Location?: LocationCreateNestedManyWithoutResourceInput
    ResourceCategory?: ResourceCategoryCreateNestedOneWithoutResourceInput
    User?: UserCreateNestedOneWithoutResourcesInput
    ResourceEditSuggestion?: ResourceEditSuggestionCreateNestedManyWithoutResourceInput
    ResourceLike?: ResourceLikeCreateNestedManyWithoutResourceInput
    ResourceReview?: ResourceReviewCreateNestedManyWithoutResourceInput
  }

  export type ResourceUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    address: string
    city?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    facebookLink?: string | null
    email?: string | null
    status?: $Enums.ResourceStatus
    url?: string | null
    categoryId?: number | null
    createdById?: number | null
    createdAt?: Date | string
    Location?: LocationUncheckedCreateNestedManyWithoutResourceInput
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedCreateNestedManyWithoutResourceInput
    ResourceLike?: ResourceLikeUncheckedCreateNestedManyWithoutResourceInput
    ResourceReview?: ResourceReviewUncheckedCreateNestedManyWithoutResourceInput
  }

  export type ResourceUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookLink?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Location?: LocationUpdateManyWithoutResourceNestedInput
    ResourceCategory?: ResourceCategoryUpdateOneWithoutResourceNestedInput
    User?: UserUpdateOneWithoutResourcesNestedInput
    ResourceEditSuggestion?: ResourceEditSuggestionUpdateManyWithoutResourceNestedInput
    ResourceLike?: ResourceLikeUpdateManyWithoutResourceNestedInput
    ResourceReview?: ResourceReviewUpdateManyWithoutResourceNestedInput
  }

  export type ResourceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookLink?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    createdById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Location?: LocationUncheckedUpdateManyWithoutResourceNestedInput
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedUpdateManyWithoutResourceNestedInput
    ResourceLike?: ResourceLikeUncheckedUpdateManyWithoutResourceNestedInput
    ResourceReview?: ResourceReviewUncheckedUpdateManyWithoutResourceNestedInput
  }

  export type ResourceCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    address: string
    city?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    facebookLink?: string | null
    email?: string | null
    status?: $Enums.ResourceStatus
    url?: string | null
    categoryId?: number | null
    createdById?: number | null
    createdAt?: Date | string
  }

  export type ResourceUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookLink?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookLink?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    createdById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceCategoryCreateInput = {
    name: string
    Resource?: ResourceCreateNestedManyWithoutResourceCategoryInput
    ResourceEditSuggestion?: ResourceEditSuggestionCreateNestedManyWithoutResourceCategoryInput
  }

  export type ResourceCategoryUncheckedCreateInput = {
    id?: number
    name: string
    Resource?: ResourceUncheckedCreateNestedManyWithoutResourceCategoryInput
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedCreateNestedManyWithoutResourceCategoryInput
  }

  export type ResourceCategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    Resource?: ResourceUpdateManyWithoutResourceCategoryNestedInput
    ResourceEditSuggestion?: ResourceEditSuggestionUpdateManyWithoutResourceCategoryNestedInput
  }

  export type ResourceCategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    Resource?: ResourceUncheckedUpdateManyWithoutResourceCategoryNestedInput
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedUpdateManyWithoutResourceCategoryNestedInput
  }

  export type ResourceCategoryCreateManyInput = {
    id?: number
    name: string
  }

  export type ResourceCategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ResourceCategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ResourceEditSuggestionCreateInput = {
    name?: string | null
    address?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    url?: string | null
    createdAt?: Date | string
    status?: $Enums.ResourceStatus
    ResourceCategory?: ResourceCategoryCreateNestedOneWithoutResourceEditSuggestionInput
    resource: ResourceCreateNestedOneWithoutResourceEditSuggestionInput
    User?: UserCreateNestedOneWithoutResourceEditSuggestionInput
  }

  export type ResourceEditSuggestionUncheckedCreateInput = {
    id?: number
    resourceId: number
    suggestedById?: number | null
    name?: string | null
    categoryId?: number | null
    address?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    url?: string | null
    createdAt?: Date | string
    status?: $Enums.ResourceStatus
  }

  export type ResourceEditSuggestionUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
    ResourceCategory?: ResourceCategoryUpdateOneWithoutResourceEditSuggestionNestedInput
    resource?: ResourceUpdateOneRequiredWithoutResourceEditSuggestionNestedInput
    User?: UserUpdateOneWithoutResourceEditSuggestionNestedInput
  }

  export type ResourceEditSuggestionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    resourceId?: IntFieldUpdateOperationsInput | number
    suggestedById?: NullableIntFieldUpdateOperationsInput | number | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
  }

  export type ResourceEditSuggestionCreateManyInput = {
    id?: number
    resourceId: number
    suggestedById?: number | null
    name?: string | null
    categoryId?: number | null
    address?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    url?: string | null
    createdAt?: Date | string
    status?: $Enums.ResourceStatus
  }

  export type ResourceEditSuggestionUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
  }

  export type ResourceEditSuggestionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    resourceId?: IntFieldUpdateOperationsInput | number
    suggestedById?: NullableIntFieldUpdateOperationsInput | number | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
  }

  export type ResourceLikeCreateInput = {
    createdAt?: Date | string
    resource: ResourceCreateNestedOneWithoutResourceLikeInput
    User: UserCreateNestedOneWithoutLikesInput
  }

  export type ResourceLikeUncheckedCreateInput = {
    id?: number
    resourceId: number
    userId: number
    createdAt?: Date | string
  }

  export type ResourceLikeUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resource?: ResourceUpdateOneRequiredWithoutResourceLikeNestedInput
    User?: UserUpdateOneRequiredWithoutLikesNestedInput
  }

  export type ResourceLikeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    resourceId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceLikeCreateManyInput = {
    id?: number
    resourceId: number
    userId: number
    createdAt?: Date | string
  }

  export type ResourceLikeUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceLikeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    resourceId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceReviewCreateInput = {
    rating: Decimal | DecimalJsLike | number | string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resource: ResourceCreateNestedOneWithoutResourceReviewInput
    user: UserCreateNestedOneWithoutReviewsInput
  }

  export type ResourceReviewUncheckedCreateInput = {
    id?: number
    resourceId: number
    userId: number
    rating: Decimal | DecimalJsLike | number | string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResourceReviewUpdateInput = {
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resource?: ResourceUpdateOneRequiredWithoutResourceReviewNestedInput
    user?: UserUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ResourceReviewUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    resourceId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceReviewCreateManyInput = {
    id?: number
    resourceId: number
    userId: number
    rating: Decimal | DecimalJsLike | number | string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResourceReviewUpdateManyMutationInput = {
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceReviewUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    resourceId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ResourceListRelationFilter = {
    every?: ResourceWhereInput
    some?: ResourceWhereInput
    none?: ResourceWhereInput
  }

  export type ResourceEditSuggestionListRelationFilter = {
    every?: ResourceEditSuggestionWhereInput
    some?: ResourceEditSuggestionWhereInput
    none?: ResourceEditSuggestionWhereInput
  }

  export type ResourceLikeListRelationFilter = {
    every?: ResourceLikeWhereInput
    some?: ResourceLikeWhereInput
    none?: ResourceLikeWhereInput
  }

  export type ResourceReviewListRelationFilter = {
    every?: ResourceReviewWhereInput
    some?: ResourceReviewWhereInput
    none?: ResourceReviewWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ResourceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResourceEditSuggestionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResourceLikeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResourceReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    image?: SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    forgotPasswordToken?: SortOrder
    forgotPasswordTokenExpiry?: SortOrder
    verifyToken?: SortOrder
    verifyTokenExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    image?: SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    forgotPasswordToken?: SortOrder
    forgotPasswordTokenExpiry?: SortOrder
    verifyToken?: SortOrder
    verifyTokenExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    image?: SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    forgotPasswordToken?: SortOrder
    forgotPasswordTokenExpiry?: SortOrder
    verifyToken?: SortOrder
    verifyTokenExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type ResourceScalarRelationFilter = {
    is?: ResourceWhereInput
    isNot?: ResourceWhereInput
  }

  export type LocationCountOrderByAggregateInput = {
    id?: SortOrder
    resourceId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type LocationAvgOrderByAggregateInput = {
    id?: SortOrder
    resourceId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type LocationMaxOrderByAggregateInput = {
    id?: SortOrder
    resourceId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type LocationMinOrderByAggregateInput = {
    id?: SortOrder
    resourceId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type LocationSumOrderByAggregateInput = {
    id?: SortOrder
    resourceId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumResourceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ResourceStatus | EnumResourceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResourceStatus[] | ListEnumResourceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResourceStatus[] | ListEnumResourceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumResourceStatusFilter<$PrismaModel> | $Enums.ResourceStatus
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type LocationListRelationFilter = {
    every?: LocationWhereInput
    some?: LocationWhereInput
    none?: LocationWhereInput
  }

  export type ResourceCategoryNullableScalarRelationFilter = {
    is?: ResourceCategoryWhereInput | null
    isNot?: ResourceCategoryWhereInput | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type LocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResourceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    address?: SortOrder
    city?: SortOrder
    openDays?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    phone?: SortOrder
    rating?: SortOrder
    imageUrl?: SortOrder
    facebookLink?: SortOrder
    email?: SortOrder
    status?: SortOrder
    url?: SortOrder
    categoryId?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
  }

  export type ResourceAvgOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    categoryId?: SortOrder
    createdById?: SortOrder
  }

  export type ResourceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    address?: SortOrder
    city?: SortOrder
    openDays?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    phone?: SortOrder
    rating?: SortOrder
    imageUrl?: SortOrder
    facebookLink?: SortOrder
    email?: SortOrder
    status?: SortOrder
    url?: SortOrder
    categoryId?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
  }

  export type ResourceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    address?: SortOrder
    city?: SortOrder
    openDays?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    phone?: SortOrder
    rating?: SortOrder
    imageUrl?: SortOrder
    facebookLink?: SortOrder
    email?: SortOrder
    status?: SortOrder
    url?: SortOrder
    categoryId?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
  }

  export type ResourceSumOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    categoryId?: SortOrder
    createdById?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumResourceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ResourceStatus | EnumResourceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResourceStatus[] | ListEnumResourceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResourceStatus[] | ListEnumResourceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumResourceStatusWithAggregatesFilter<$PrismaModel> | $Enums.ResourceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumResourceStatusFilter<$PrismaModel>
    _max?: NestedEnumResourceStatusFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ResourceCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type ResourceCategoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ResourceCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type ResourceCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type ResourceCategorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ResourceEditSuggestionCountOrderByAggregateInput = {
    id?: SortOrder
    resourceId?: SortOrder
    suggestedById?: SortOrder
    name?: SortOrder
    categoryId?: SortOrder
    address?: SortOrder
    openDays?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    phone?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    status?: SortOrder
  }

  export type ResourceEditSuggestionAvgOrderByAggregateInput = {
    id?: SortOrder
    resourceId?: SortOrder
    suggestedById?: SortOrder
    categoryId?: SortOrder
  }

  export type ResourceEditSuggestionMaxOrderByAggregateInput = {
    id?: SortOrder
    resourceId?: SortOrder
    suggestedById?: SortOrder
    name?: SortOrder
    categoryId?: SortOrder
    address?: SortOrder
    openDays?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    phone?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    status?: SortOrder
  }

  export type ResourceEditSuggestionMinOrderByAggregateInput = {
    id?: SortOrder
    resourceId?: SortOrder
    suggestedById?: SortOrder
    name?: SortOrder
    categoryId?: SortOrder
    address?: SortOrder
    openDays?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    phone?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    status?: SortOrder
  }

  export type ResourceEditSuggestionSumOrderByAggregateInput = {
    id?: SortOrder
    resourceId?: SortOrder
    suggestedById?: SortOrder
    categoryId?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ResourceLikeResourceIdUserIdCompoundUniqueInput = {
    resourceId: number
    userId: number
  }

  export type ResourceLikeCountOrderByAggregateInput = {
    id?: SortOrder
    resourceId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type ResourceLikeAvgOrderByAggregateInput = {
    id?: SortOrder
    resourceId?: SortOrder
    userId?: SortOrder
  }

  export type ResourceLikeMaxOrderByAggregateInput = {
    id?: SortOrder
    resourceId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type ResourceLikeMinOrderByAggregateInput = {
    id?: SortOrder
    resourceId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type ResourceLikeSumOrderByAggregateInput = {
    id?: SortOrder
    resourceId?: SortOrder
    userId?: SortOrder
  }

  export type ResourceReviewCountOrderByAggregateInput = {
    id?: SortOrder
    resourceId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResourceReviewAvgOrderByAggregateInput = {
    id?: SortOrder
    resourceId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
  }

  export type ResourceReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    resourceId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResourceReviewMinOrderByAggregateInput = {
    id?: SortOrder
    resourceId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResourceReviewSumOrderByAggregateInput = {
    id?: SortOrder
    resourceId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
  }

  export type ResourceCreateNestedManyWithoutUserInput = {
    create?: XOR<ResourceCreateWithoutUserInput, ResourceUncheckedCreateWithoutUserInput> | ResourceCreateWithoutUserInput[] | ResourceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutUserInput | ResourceCreateOrConnectWithoutUserInput[]
    createMany?: ResourceCreateManyUserInputEnvelope
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
  }

  export type ResourceEditSuggestionCreateNestedManyWithoutUserInput = {
    create?: XOR<ResourceEditSuggestionCreateWithoutUserInput, ResourceEditSuggestionUncheckedCreateWithoutUserInput> | ResourceEditSuggestionCreateWithoutUserInput[] | ResourceEditSuggestionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceEditSuggestionCreateOrConnectWithoutUserInput | ResourceEditSuggestionCreateOrConnectWithoutUserInput[]
    createMany?: ResourceEditSuggestionCreateManyUserInputEnvelope
    connect?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
  }

  export type ResourceLikeCreateNestedManyWithoutUserInput = {
    create?: XOR<ResourceLikeCreateWithoutUserInput, ResourceLikeUncheckedCreateWithoutUserInput> | ResourceLikeCreateWithoutUserInput[] | ResourceLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceLikeCreateOrConnectWithoutUserInput | ResourceLikeCreateOrConnectWithoutUserInput[]
    createMany?: ResourceLikeCreateManyUserInputEnvelope
    connect?: ResourceLikeWhereUniqueInput | ResourceLikeWhereUniqueInput[]
  }

  export type ResourceReviewCreateNestedManyWithoutUserInput = {
    create?: XOR<ResourceReviewCreateWithoutUserInput, ResourceReviewUncheckedCreateWithoutUserInput> | ResourceReviewCreateWithoutUserInput[] | ResourceReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceReviewCreateOrConnectWithoutUserInput | ResourceReviewCreateOrConnectWithoutUserInput[]
    createMany?: ResourceReviewCreateManyUserInputEnvelope
    connect?: ResourceReviewWhereUniqueInput | ResourceReviewWhereUniqueInput[]
  }

  export type ResourceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ResourceCreateWithoutUserInput, ResourceUncheckedCreateWithoutUserInput> | ResourceCreateWithoutUserInput[] | ResourceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutUserInput | ResourceCreateOrConnectWithoutUserInput[]
    createMany?: ResourceCreateManyUserInputEnvelope
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
  }

  export type ResourceEditSuggestionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ResourceEditSuggestionCreateWithoutUserInput, ResourceEditSuggestionUncheckedCreateWithoutUserInput> | ResourceEditSuggestionCreateWithoutUserInput[] | ResourceEditSuggestionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceEditSuggestionCreateOrConnectWithoutUserInput | ResourceEditSuggestionCreateOrConnectWithoutUserInput[]
    createMany?: ResourceEditSuggestionCreateManyUserInputEnvelope
    connect?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
  }

  export type ResourceLikeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ResourceLikeCreateWithoutUserInput, ResourceLikeUncheckedCreateWithoutUserInput> | ResourceLikeCreateWithoutUserInput[] | ResourceLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceLikeCreateOrConnectWithoutUserInput | ResourceLikeCreateOrConnectWithoutUserInput[]
    createMany?: ResourceLikeCreateManyUserInputEnvelope
    connect?: ResourceLikeWhereUniqueInput | ResourceLikeWhereUniqueInput[]
  }

  export type ResourceReviewUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ResourceReviewCreateWithoutUserInput, ResourceReviewUncheckedCreateWithoutUserInput> | ResourceReviewCreateWithoutUserInput[] | ResourceReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceReviewCreateOrConnectWithoutUserInput | ResourceReviewCreateOrConnectWithoutUserInput[]
    createMany?: ResourceReviewCreateManyUserInputEnvelope
    connect?: ResourceReviewWhereUniqueInput | ResourceReviewWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ResourceUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResourceCreateWithoutUserInput, ResourceUncheckedCreateWithoutUserInput> | ResourceCreateWithoutUserInput[] | ResourceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutUserInput | ResourceCreateOrConnectWithoutUserInput[]
    upsert?: ResourceUpsertWithWhereUniqueWithoutUserInput | ResourceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResourceCreateManyUserInputEnvelope
    set?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    disconnect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    delete?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    update?: ResourceUpdateWithWhereUniqueWithoutUserInput | ResourceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResourceUpdateManyWithWhereWithoutUserInput | ResourceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResourceScalarWhereInput | ResourceScalarWhereInput[]
  }

  export type ResourceEditSuggestionUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResourceEditSuggestionCreateWithoutUserInput, ResourceEditSuggestionUncheckedCreateWithoutUserInput> | ResourceEditSuggestionCreateWithoutUserInput[] | ResourceEditSuggestionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceEditSuggestionCreateOrConnectWithoutUserInput | ResourceEditSuggestionCreateOrConnectWithoutUserInput[]
    upsert?: ResourceEditSuggestionUpsertWithWhereUniqueWithoutUserInput | ResourceEditSuggestionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResourceEditSuggestionCreateManyUserInputEnvelope
    set?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    disconnect?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    delete?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    connect?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    update?: ResourceEditSuggestionUpdateWithWhereUniqueWithoutUserInput | ResourceEditSuggestionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResourceEditSuggestionUpdateManyWithWhereWithoutUserInput | ResourceEditSuggestionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResourceEditSuggestionScalarWhereInput | ResourceEditSuggestionScalarWhereInput[]
  }

  export type ResourceLikeUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResourceLikeCreateWithoutUserInput, ResourceLikeUncheckedCreateWithoutUserInput> | ResourceLikeCreateWithoutUserInput[] | ResourceLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceLikeCreateOrConnectWithoutUserInput | ResourceLikeCreateOrConnectWithoutUserInput[]
    upsert?: ResourceLikeUpsertWithWhereUniqueWithoutUserInput | ResourceLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResourceLikeCreateManyUserInputEnvelope
    set?: ResourceLikeWhereUniqueInput | ResourceLikeWhereUniqueInput[]
    disconnect?: ResourceLikeWhereUniqueInput | ResourceLikeWhereUniqueInput[]
    delete?: ResourceLikeWhereUniqueInput | ResourceLikeWhereUniqueInput[]
    connect?: ResourceLikeWhereUniqueInput | ResourceLikeWhereUniqueInput[]
    update?: ResourceLikeUpdateWithWhereUniqueWithoutUserInput | ResourceLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResourceLikeUpdateManyWithWhereWithoutUserInput | ResourceLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResourceLikeScalarWhereInput | ResourceLikeScalarWhereInput[]
  }

  export type ResourceReviewUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResourceReviewCreateWithoutUserInput, ResourceReviewUncheckedCreateWithoutUserInput> | ResourceReviewCreateWithoutUserInput[] | ResourceReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceReviewCreateOrConnectWithoutUserInput | ResourceReviewCreateOrConnectWithoutUserInput[]
    upsert?: ResourceReviewUpsertWithWhereUniqueWithoutUserInput | ResourceReviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResourceReviewCreateManyUserInputEnvelope
    set?: ResourceReviewWhereUniqueInput | ResourceReviewWhereUniqueInput[]
    disconnect?: ResourceReviewWhereUniqueInput | ResourceReviewWhereUniqueInput[]
    delete?: ResourceReviewWhereUniqueInput | ResourceReviewWhereUniqueInput[]
    connect?: ResourceReviewWhereUniqueInput | ResourceReviewWhereUniqueInput[]
    update?: ResourceReviewUpdateWithWhereUniqueWithoutUserInput | ResourceReviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResourceReviewUpdateManyWithWhereWithoutUserInput | ResourceReviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResourceReviewScalarWhereInput | ResourceReviewScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ResourceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResourceCreateWithoutUserInput, ResourceUncheckedCreateWithoutUserInput> | ResourceCreateWithoutUserInput[] | ResourceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutUserInput | ResourceCreateOrConnectWithoutUserInput[]
    upsert?: ResourceUpsertWithWhereUniqueWithoutUserInput | ResourceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResourceCreateManyUserInputEnvelope
    set?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    disconnect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    delete?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    update?: ResourceUpdateWithWhereUniqueWithoutUserInput | ResourceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResourceUpdateManyWithWhereWithoutUserInput | ResourceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResourceScalarWhereInput | ResourceScalarWhereInput[]
  }

  export type ResourceEditSuggestionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResourceEditSuggestionCreateWithoutUserInput, ResourceEditSuggestionUncheckedCreateWithoutUserInput> | ResourceEditSuggestionCreateWithoutUserInput[] | ResourceEditSuggestionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceEditSuggestionCreateOrConnectWithoutUserInput | ResourceEditSuggestionCreateOrConnectWithoutUserInput[]
    upsert?: ResourceEditSuggestionUpsertWithWhereUniqueWithoutUserInput | ResourceEditSuggestionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResourceEditSuggestionCreateManyUserInputEnvelope
    set?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    disconnect?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    delete?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    connect?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    update?: ResourceEditSuggestionUpdateWithWhereUniqueWithoutUserInput | ResourceEditSuggestionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResourceEditSuggestionUpdateManyWithWhereWithoutUserInput | ResourceEditSuggestionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResourceEditSuggestionScalarWhereInput | ResourceEditSuggestionScalarWhereInput[]
  }

  export type ResourceLikeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResourceLikeCreateWithoutUserInput, ResourceLikeUncheckedCreateWithoutUserInput> | ResourceLikeCreateWithoutUserInput[] | ResourceLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceLikeCreateOrConnectWithoutUserInput | ResourceLikeCreateOrConnectWithoutUserInput[]
    upsert?: ResourceLikeUpsertWithWhereUniqueWithoutUserInput | ResourceLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResourceLikeCreateManyUserInputEnvelope
    set?: ResourceLikeWhereUniqueInput | ResourceLikeWhereUniqueInput[]
    disconnect?: ResourceLikeWhereUniqueInput | ResourceLikeWhereUniqueInput[]
    delete?: ResourceLikeWhereUniqueInput | ResourceLikeWhereUniqueInput[]
    connect?: ResourceLikeWhereUniqueInput | ResourceLikeWhereUniqueInput[]
    update?: ResourceLikeUpdateWithWhereUniqueWithoutUserInput | ResourceLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResourceLikeUpdateManyWithWhereWithoutUserInput | ResourceLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResourceLikeScalarWhereInput | ResourceLikeScalarWhereInput[]
  }

  export type ResourceReviewUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResourceReviewCreateWithoutUserInput, ResourceReviewUncheckedCreateWithoutUserInput> | ResourceReviewCreateWithoutUserInput[] | ResourceReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResourceReviewCreateOrConnectWithoutUserInput | ResourceReviewCreateOrConnectWithoutUserInput[]
    upsert?: ResourceReviewUpsertWithWhereUniqueWithoutUserInput | ResourceReviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResourceReviewCreateManyUserInputEnvelope
    set?: ResourceReviewWhereUniqueInput | ResourceReviewWhereUniqueInput[]
    disconnect?: ResourceReviewWhereUniqueInput | ResourceReviewWhereUniqueInput[]
    delete?: ResourceReviewWhereUniqueInput | ResourceReviewWhereUniqueInput[]
    connect?: ResourceReviewWhereUniqueInput | ResourceReviewWhereUniqueInput[]
    update?: ResourceReviewUpdateWithWhereUniqueWithoutUserInput | ResourceReviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResourceReviewUpdateManyWithWhereWithoutUserInput | ResourceReviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResourceReviewScalarWhereInput | ResourceReviewScalarWhereInput[]
  }

  export type ResourceCreateNestedOneWithoutLocationInput = {
    create?: XOR<ResourceCreateWithoutLocationInput, ResourceUncheckedCreateWithoutLocationInput>
    connectOrCreate?: ResourceCreateOrConnectWithoutLocationInput
    connect?: ResourceWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ResourceUpdateOneRequiredWithoutLocationNestedInput = {
    create?: XOR<ResourceCreateWithoutLocationInput, ResourceUncheckedCreateWithoutLocationInput>
    connectOrCreate?: ResourceCreateOrConnectWithoutLocationInput
    upsert?: ResourceUpsertWithoutLocationInput
    connect?: ResourceWhereUniqueInput
    update?: XOR<XOR<ResourceUpdateToOneWithWhereWithoutLocationInput, ResourceUpdateWithoutLocationInput>, ResourceUncheckedUpdateWithoutLocationInput>
  }

  export type LocationCreateNestedManyWithoutResourceInput = {
    create?: XOR<LocationCreateWithoutResourceInput, LocationUncheckedCreateWithoutResourceInput> | LocationCreateWithoutResourceInput[] | LocationUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutResourceInput | LocationCreateOrConnectWithoutResourceInput[]
    createMany?: LocationCreateManyResourceInputEnvelope
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
  }

  export type ResourceCategoryCreateNestedOneWithoutResourceInput = {
    create?: XOR<ResourceCategoryCreateWithoutResourceInput, ResourceCategoryUncheckedCreateWithoutResourceInput>
    connectOrCreate?: ResourceCategoryCreateOrConnectWithoutResourceInput
    connect?: ResourceCategoryWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutResourcesInput = {
    create?: XOR<UserCreateWithoutResourcesInput, UserUncheckedCreateWithoutResourcesInput>
    connectOrCreate?: UserCreateOrConnectWithoutResourcesInput
    connect?: UserWhereUniqueInput
  }

  export type ResourceEditSuggestionCreateNestedManyWithoutResourceInput = {
    create?: XOR<ResourceEditSuggestionCreateWithoutResourceInput, ResourceEditSuggestionUncheckedCreateWithoutResourceInput> | ResourceEditSuggestionCreateWithoutResourceInput[] | ResourceEditSuggestionUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: ResourceEditSuggestionCreateOrConnectWithoutResourceInput | ResourceEditSuggestionCreateOrConnectWithoutResourceInput[]
    createMany?: ResourceEditSuggestionCreateManyResourceInputEnvelope
    connect?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
  }

  export type ResourceLikeCreateNestedManyWithoutResourceInput = {
    create?: XOR<ResourceLikeCreateWithoutResourceInput, ResourceLikeUncheckedCreateWithoutResourceInput> | ResourceLikeCreateWithoutResourceInput[] | ResourceLikeUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: ResourceLikeCreateOrConnectWithoutResourceInput | ResourceLikeCreateOrConnectWithoutResourceInput[]
    createMany?: ResourceLikeCreateManyResourceInputEnvelope
    connect?: ResourceLikeWhereUniqueInput | ResourceLikeWhereUniqueInput[]
  }

  export type ResourceReviewCreateNestedManyWithoutResourceInput = {
    create?: XOR<ResourceReviewCreateWithoutResourceInput, ResourceReviewUncheckedCreateWithoutResourceInput> | ResourceReviewCreateWithoutResourceInput[] | ResourceReviewUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: ResourceReviewCreateOrConnectWithoutResourceInput | ResourceReviewCreateOrConnectWithoutResourceInput[]
    createMany?: ResourceReviewCreateManyResourceInputEnvelope
    connect?: ResourceReviewWhereUniqueInput | ResourceReviewWhereUniqueInput[]
  }

  export type LocationUncheckedCreateNestedManyWithoutResourceInput = {
    create?: XOR<LocationCreateWithoutResourceInput, LocationUncheckedCreateWithoutResourceInput> | LocationCreateWithoutResourceInput[] | LocationUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutResourceInput | LocationCreateOrConnectWithoutResourceInput[]
    createMany?: LocationCreateManyResourceInputEnvelope
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
  }

  export type ResourceEditSuggestionUncheckedCreateNestedManyWithoutResourceInput = {
    create?: XOR<ResourceEditSuggestionCreateWithoutResourceInput, ResourceEditSuggestionUncheckedCreateWithoutResourceInput> | ResourceEditSuggestionCreateWithoutResourceInput[] | ResourceEditSuggestionUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: ResourceEditSuggestionCreateOrConnectWithoutResourceInput | ResourceEditSuggestionCreateOrConnectWithoutResourceInput[]
    createMany?: ResourceEditSuggestionCreateManyResourceInputEnvelope
    connect?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
  }

  export type ResourceLikeUncheckedCreateNestedManyWithoutResourceInput = {
    create?: XOR<ResourceLikeCreateWithoutResourceInput, ResourceLikeUncheckedCreateWithoutResourceInput> | ResourceLikeCreateWithoutResourceInput[] | ResourceLikeUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: ResourceLikeCreateOrConnectWithoutResourceInput | ResourceLikeCreateOrConnectWithoutResourceInput[]
    createMany?: ResourceLikeCreateManyResourceInputEnvelope
    connect?: ResourceLikeWhereUniqueInput | ResourceLikeWhereUniqueInput[]
  }

  export type ResourceReviewUncheckedCreateNestedManyWithoutResourceInput = {
    create?: XOR<ResourceReviewCreateWithoutResourceInput, ResourceReviewUncheckedCreateWithoutResourceInput> | ResourceReviewCreateWithoutResourceInput[] | ResourceReviewUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: ResourceReviewCreateOrConnectWithoutResourceInput | ResourceReviewCreateOrConnectWithoutResourceInput[]
    createMany?: ResourceReviewCreateManyResourceInputEnvelope
    connect?: ResourceReviewWhereUniqueInput | ResourceReviewWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumResourceStatusFieldUpdateOperationsInput = {
    set?: $Enums.ResourceStatus
  }

  export type LocationUpdateManyWithoutResourceNestedInput = {
    create?: XOR<LocationCreateWithoutResourceInput, LocationUncheckedCreateWithoutResourceInput> | LocationCreateWithoutResourceInput[] | LocationUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutResourceInput | LocationCreateOrConnectWithoutResourceInput[]
    upsert?: LocationUpsertWithWhereUniqueWithoutResourceInput | LocationUpsertWithWhereUniqueWithoutResourceInput[]
    createMany?: LocationCreateManyResourceInputEnvelope
    set?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    disconnect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    delete?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    update?: LocationUpdateWithWhereUniqueWithoutResourceInput | LocationUpdateWithWhereUniqueWithoutResourceInput[]
    updateMany?: LocationUpdateManyWithWhereWithoutResourceInput | LocationUpdateManyWithWhereWithoutResourceInput[]
    deleteMany?: LocationScalarWhereInput | LocationScalarWhereInput[]
  }

  export type ResourceCategoryUpdateOneWithoutResourceNestedInput = {
    create?: XOR<ResourceCategoryCreateWithoutResourceInput, ResourceCategoryUncheckedCreateWithoutResourceInput>
    connectOrCreate?: ResourceCategoryCreateOrConnectWithoutResourceInput
    upsert?: ResourceCategoryUpsertWithoutResourceInput
    disconnect?: ResourceCategoryWhereInput | boolean
    delete?: ResourceCategoryWhereInput | boolean
    connect?: ResourceCategoryWhereUniqueInput
    update?: XOR<XOR<ResourceCategoryUpdateToOneWithWhereWithoutResourceInput, ResourceCategoryUpdateWithoutResourceInput>, ResourceCategoryUncheckedUpdateWithoutResourceInput>
  }

  export type UserUpdateOneWithoutResourcesNestedInput = {
    create?: XOR<UserCreateWithoutResourcesInput, UserUncheckedCreateWithoutResourcesInput>
    connectOrCreate?: UserCreateOrConnectWithoutResourcesInput
    upsert?: UserUpsertWithoutResourcesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutResourcesInput, UserUpdateWithoutResourcesInput>, UserUncheckedUpdateWithoutResourcesInput>
  }

  export type ResourceEditSuggestionUpdateManyWithoutResourceNestedInput = {
    create?: XOR<ResourceEditSuggestionCreateWithoutResourceInput, ResourceEditSuggestionUncheckedCreateWithoutResourceInput> | ResourceEditSuggestionCreateWithoutResourceInput[] | ResourceEditSuggestionUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: ResourceEditSuggestionCreateOrConnectWithoutResourceInput | ResourceEditSuggestionCreateOrConnectWithoutResourceInput[]
    upsert?: ResourceEditSuggestionUpsertWithWhereUniqueWithoutResourceInput | ResourceEditSuggestionUpsertWithWhereUniqueWithoutResourceInput[]
    createMany?: ResourceEditSuggestionCreateManyResourceInputEnvelope
    set?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    disconnect?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    delete?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    connect?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    update?: ResourceEditSuggestionUpdateWithWhereUniqueWithoutResourceInput | ResourceEditSuggestionUpdateWithWhereUniqueWithoutResourceInput[]
    updateMany?: ResourceEditSuggestionUpdateManyWithWhereWithoutResourceInput | ResourceEditSuggestionUpdateManyWithWhereWithoutResourceInput[]
    deleteMany?: ResourceEditSuggestionScalarWhereInput | ResourceEditSuggestionScalarWhereInput[]
  }

  export type ResourceLikeUpdateManyWithoutResourceNestedInput = {
    create?: XOR<ResourceLikeCreateWithoutResourceInput, ResourceLikeUncheckedCreateWithoutResourceInput> | ResourceLikeCreateWithoutResourceInput[] | ResourceLikeUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: ResourceLikeCreateOrConnectWithoutResourceInput | ResourceLikeCreateOrConnectWithoutResourceInput[]
    upsert?: ResourceLikeUpsertWithWhereUniqueWithoutResourceInput | ResourceLikeUpsertWithWhereUniqueWithoutResourceInput[]
    createMany?: ResourceLikeCreateManyResourceInputEnvelope
    set?: ResourceLikeWhereUniqueInput | ResourceLikeWhereUniqueInput[]
    disconnect?: ResourceLikeWhereUniqueInput | ResourceLikeWhereUniqueInput[]
    delete?: ResourceLikeWhereUniqueInput | ResourceLikeWhereUniqueInput[]
    connect?: ResourceLikeWhereUniqueInput | ResourceLikeWhereUniqueInput[]
    update?: ResourceLikeUpdateWithWhereUniqueWithoutResourceInput | ResourceLikeUpdateWithWhereUniqueWithoutResourceInput[]
    updateMany?: ResourceLikeUpdateManyWithWhereWithoutResourceInput | ResourceLikeUpdateManyWithWhereWithoutResourceInput[]
    deleteMany?: ResourceLikeScalarWhereInput | ResourceLikeScalarWhereInput[]
  }

  export type ResourceReviewUpdateManyWithoutResourceNestedInput = {
    create?: XOR<ResourceReviewCreateWithoutResourceInput, ResourceReviewUncheckedCreateWithoutResourceInput> | ResourceReviewCreateWithoutResourceInput[] | ResourceReviewUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: ResourceReviewCreateOrConnectWithoutResourceInput | ResourceReviewCreateOrConnectWithoutResourceInput[]
    upsert?: ResourceReviewUpsertWithWhereUniqueWithoutResourceInput | ResourceReviewUpsertWithWhereUniqueWithoutResourceInput[]
    createMany?: ResourceReviewCreateManyResourceInputEnvelope
    set?: ResourceReviewWhereUniqueInput | ResourceReviewWhereUniqueInput[]
    disconnect?: ResourceReviewWhereUniqueInput | ResourceReviewWhereUniqueInput[]
    delete?: ResourceReviewWhereUniqueInput | ResourceReviewWhereUniqueInput[]
    connect?: ResourceReviewWhereUniqueInput | ResourceReviewWhereUniqueInput[]
    update?: ResourceReviewUpdateWithWhereUniqueWithoutResourceInput | ResourceReviewUpdateWithWhereUniqueWithoutResourceInput[]
    updateMany?: ResourceReviewUpdateManyWithWhereWithoutResourceInput | ResourceReviewUpdateManyWithWhereWithoutResourceInput[]
    deleteMany?: ResourceReviewScalarWhereInput | ResourceReviewScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LocationUncheckedUpdateManyWithoutResourceNestedInput = {
    create?: XOR<LocationCreateWithoutResourceInput, LocationUncheckedCreateWithoutResourceInput> | LocationCreateWithoutResourceInput[] | LocationUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutResourceInput | LocationCreateOrConnectWithoutResourceInput[]
    upsert?: LocationUpsertWithWhereUniqueWithoutResourceInput | LocationUpsertWithWhereUniqueWithoutResourceInput[]
    createMany?: LocationCreateManyResourceInputEnvelope
    set?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    disconnect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    delete?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    update?: LocationUpdateWithWhereUniqueWithoutResourceInput | LocationUpdateWithWhereUniqueWithoutResourceInput[]
    updateMany?: LocationUpdateManyWithWhereWithoutResourceInput | LocationUpdateManyWithWhereWithoutResourceInput[]
    deleteMany?: LocationScalarWhereInput | LocationScalarWhereInput[]
  }

  export type ResourceEditSuggestionUncheckedUpdateManyWithoutResourceNestedInput = {
    create?: XOR<ResourceEditSuggestionCreateWithoutResourceInput, ResourceEditSuggestionUncheckedCreateWithoutResourceInput> | ResourceEditSuggestionCreateWithoutResourceInput[] | ResourceEditSuggestionUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: ResourceEditSuggestionCreateOrConnectWithoutResourceInput | ResourceEditSuggestionCreateOrConnectWithoutResourceInput[]
    upsert?: ResourceEditSuggestionUpsertWithWhereUniqueWithoutResourceInput | ResourceEditSuggestionUpsertWithWhereUniqueWithoutResourceInput[]
    createMany?: ResourceEditSuggestionCreateManyResourceInputEnvelope
    set?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    disconnect?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    delete?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    connect?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    update?: ResourceEditSuggestionUpdateWithWhereUniqueWithoutResourceInput | ResourceEditSuggestionUpdateWithWhereUniqueWithoutResourceInput[]
    updateMany?: ResourceEditSuggestionUpdateManyWithWhereWithoutResourceInput | ResourceEditSuggestionUpdateManyWithWhereWithoutResourceInput[]
    deleteMany?: ResourceEditSuggestionScalarWhereInput | ResourceEditSuggestionScalarWhereInput[]
  }

  export type ResourceLikeUncheckedUpdateManyWithoutResourceNestedInput = {
    create?: XOR<ResourceLikeCreateWithoutResourceInput, ResourceLikeUncheckedCreateWithoutResourceInput> | ResourceLikeCreateWithoutResourceInput[] | ResourceLikeUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: ResourceLikeCreateOrConnectWithoutResourceInput | ResourceLikeCreateOrConnectWithoutResourceInput[]
    upsert?: ResourceLikeUpsertWithWhereUniqueWithoutResourceInput | ResourceLikeUpsertWithWhereUniqueWithoutResourceInput[]
    createMany?: ResourceLikeCreateManyResourceInputEnvelope
    set?: ResourceLikeWhereUniqueInput | ResourceLikeWhereUniqueInput[]
    disconnect?: ResourceLikeWhereUniqueInput | ResourceLikeWhereUniqueInput[]
    delete?: ResourceLikeWhereUniqueInput | ResourceLikeWhereUniqueInput[]
    connect?: ResourceLikeWhereUniqueInput | ResourceLikeWhereUniqueInput[]
    update?: ResourceLikeUpdateWithWhereUniqueWithoutResourceInput | ResourceLikeUpdateWithWhereUniqueWithoutResourceInput[]
    updateMany?: ResourceLikeUpdateManyWithWhereWithoutResourceInput | ResourceLikeUpdateManyWithWhereWithoutResourceInput[]
    deleteMany?: ResourceLikeScalarWhereInput | ResourceLikeScalarWhereInput[]
  }

  export type ResourceReviewUncheckedUpdateManyWithoutResourceNestedInput = {
    create?: XOR<ResourceReviewCreateWithoutResourceInput, ResourceReviewUncheckedCreateWithoutResourceInput> | ResourceReviewCreateWithoutResourceInput[] | ResourceReviewUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: ResourceReviewCreateOrConnectWithoutResourceInput | ResourceReviewCreateOrConnectWithoutResourceInput[]
    upsert?: ResourceReviewUpsertWithWhereUniqueWithoutResourceInput | ResourceReviewUpsertWithWhereUniqueWithoutResourceInput[]
    createMany?: ResourceReviewCreateManyResourceInputEnvelope
    set?: ResourceReviewWhereUniqueInput | ResourceReviewWhereUniqueInput[]
    disconnect?: ResourceReviewWhereUniqueInput | ResourceReviewWhereUniqueInput[]
    delete?: ResourceReviewWhereUniqueInput | ResourceReviewWhereUniqueInput[]
    connect?: ResourceReviewWhereUniqueInput | ResourceReviewWhereUniqueInput[]
    update?: ResourceReviewUpdateWithWhereUniqueWithoutResourceInput | ResourceReviewUpdateWithWhereUniqueWithoutResourceInput[]
    updateMany?: ResourceReviewUpdateManyWithWhereWithoutResourceInput | ResourceReviewUpdateManyWithWhereWithoutResourceInput[]
    deleteMany?: ResourceReviewScalarWhereInput | ResourceReviewScalarWhereInput[]
  }

  export type ResourceCreateNestedManyWithoutResourceCategoryInput = {
    create?: XOR<ResourceCreateWithoutResourceCategoryInput, ResourceUncheckedCreateWithoutResourceCategoryInput> | ResourceCreateWithoutResourceCategoryInput[] | ResourceUncheckedCreateWithoutResourceCategoryInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutResourceCategoryInput | ResourceCreateOrConnectWithoutResourceCategoryInput[]
    createMany?: ResourceCreateManyResourceCategoryInputEnvelope
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
  }

  export type ResourceEditSuggestionCreateNestedManyWithoutResourceCategoryInput = {
    create?: XOR<ResourceEditSuggestionCreateWithoutResourceCategoryInput, ResourceEditSuggestionUncheckedCreateWithoutResourceCategoryInput> | ResourceEditSuggestionCreateWithoutResourceCategoryInput[] | ResourceEditSuggestionUncheckedCreateWithoutResourceCategoryInput[]
    connectOrCreate?: ResourceEditSuggestionCreateOrConnectWithoutResourceCategoryInput | ResourceEditSuggestionCreateOrConnectWithoutResourceCategoryInput[]
    createMany?: ResourceEditSuggestionCreateManyResourceCategoryInputEnvelope
    connect?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
  }

  export type ResourceUncheckedCreateNestedManyWithoutResourceCategoryInput = {
    create?: XOR<ResourceCreateWithoutResourceCategoryInput, ResourceUncheckedCreateWithoutResourceCategoryInput> | ResourceCreateWithoutResourceCategoryInput[] | ResourceUncheckedCreateWithoutResourceCategoryInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutResourceCategoryInput | ResourceCreateOrConnectWithoutResourceCategoryInput[]
    createMany?: ResourceCreateManyResourceCategoryInputEnvelope
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
  }

  export type ResourceEditSuggestionUncheckedCreateNestedManyWithoutResourceCategoryInput = {
    create?: XOR<ResourceEditSuggestionCreateWithoutResourceCategoryInput, ResourceEditSuggestionUncheckedCreateWithoutResourceCategoryInput> | ResourceEditSuggestionCreateWithoutResourceCategoryInput[] | ResourceEditSuggestionUncheckedCreateWithoutResourceCategoryInput[]
    connectOrCreate?: ResourceEditSuggestionCreateOrConnectWithoutResourceCategoryInput | ResourceEditSuggestionCreateOrConnectWithoutResourceCategoryInput[]
    createMany?: ResourceEditSuggestionCreateManyResourceCategoryInputEnvelope
    connect?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
  }

  export type ResourceUpdateManyWithoutResourceCategoryNestedInput = {
    create?: XOR<ResourceCreateWithoutResourceCategoryInput, ResourceUncheckedCreateWithoutResourceCategoryInput> | ResourceCreateWithoutResourceCategoryInput[] | ResourceUncheckedCreateWithoutResourceCategoryInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutResourceCategoryInput | ResourceCreateOrConnectWithoutResourceCategoryInput[]
    upsert?: ResourceUpsertWithWhereUniqueWithoutResourceCategoryInput | ResourceUpsertWithWhereUniqueWithoutResourceCategoryInput[]
    createMany?: ResourceCreateManyResourceCategoryInputEnvelope
    set?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    disconnect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    delete?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    update?: ResourceUpdateWithWhereUniqueWithoutResourceCategoryInput | ResourceUpdateWithWhereUniqueWithoutResourceCategoryInput[]
    updateMany?: ResourceUpdateManyWithWhereWithoutResourceCategoryInput | ResourceUpdateManyWithWhereWithoutResourceCategoryInput[]
    deleteMany?: ResourceScalarWhereInput | ResourceScalarWhereInput[]
  }

  export type ResourceEditSuggestionUpdateManyWithoutResourceCategoryNestedInput = {
    create?: XOR<ResourceEditSuggestionCreateWithoutResourceCategoryInput, ResourceEditSuggestionUncheckedCreateWithoutResourceCategoryInput> | ResourceEditSuggestionCreateWithoutResourceCategoryInput[] | ResourceEditSuggestionUncheckedCreateWithoutResourceCategoryInput[]
    connectOrCreate?: ResourceEditSuggestionCreateOrConnectWithoutResourceCategoryInput | ResourceEditSuggestionCreateOrConnectWithoutResourceCategoryInput[]
    upsert?: ResourceEditSuggestionUpsertWithWhereUniqueWithoutResourceCategoryInput | ResourceEditSuggestionUpsertWithWhereUniqueWithoutResourceCategoryInput[]
    createMany?: ResourceEditSuggestionCreateManyResourceCategoryInputEnvelope
    set?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    disconnect?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    delete?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    connect?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    update?: ResourceEditSuggestionUpdateWithWhereUniqueWithoutResourceCategoryInput | ResourceEditSuggestionUpdateWithWhereUniqueWithoutResourceCategoryInput[]
    updateMany?: ResourceEditSuggestionUpdateManyWithWhereWithoutResourceCategoryInput | ResourceEditSuggestionUpdateManyWithWhereWithoutResourceCategoryInput[]
    deleteMany?: ResourceEditSuggestionScalarWhereInput | ResourceEditSuggestionScalarWhereInput[]
  }

  export type ResourceUncheckedUpdateManyWithoutResourceCategoryNestedInput = {
    create?: XOR<ResourceCreateWithoutResourceCategoryInput, ResourceUncheckedCreateWithoutResourceCategoryInput> | ResourceCreateWithoutResourceCategoryInput[] | ResourceUncheckedCreateWithoutResourceCategoryInput[]
    connectOrCreate?: ResourceCreateOrConnectWithoutResourceCategoryInput | ResourceCreateOrConnectWithoutResourceCategoryInput[]
    upsert?: ResourceUpsertWithWhereUniqueWithoutResourceCategoryInput | ResourceUpsertWithWhereUniqueWithoutResourceCategoryInput[]
    createMany?: ResourceCreateManyResourceCategoryInputEnvelope
    set?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    disconnect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    delete?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    connect?: ResourceWhereUniqueInput | ResourceWhereUniqueInput[]
    update?: ResourceUpdateWithWhereUniqueWithoutResourceCategoryInput | ResourceUpdateWithWhereUniqueWithoutResourceCategoryInput[]
    updateMany?: ResourceUpdateManyWithWhereWithoutResourceCategoryInput | ResourceUpdateManyWithWhereWithoutResourceCategoryInput[]
    deleteMany?: ResourceScalarWhereInput | ResourceScalarWhereInput[]
  }

  export type ResourceEditSuggestionUncheckedUpdateManyWithoutResourceCategoryNestedInput = {
    create?: XOR<ResourceEditSuggestionCreateWithoutResourceCategoryInput, ResourceEditSuggestionUncheckedCreateWithoutResourceCategoryInput> | ResourceEditSuggestionCreateWithoutResourceCategoryInput[] | ResourceEditSuggestionUncheckedCreateWithoutResourceCategoryInput[]
    connectOrCreate?: ResourceEditSuggestionCreateOrConnectWithoutResourceCategoryInput | ResourceEditSuggestionCreateOrConnectWithoutResourceCategoryInput[]
    upsert?: ResourceEditSuggestionUpsertWithWhereUniqueWithoutResourceCategoryInput | ResourceEditSuggestionUpsertWithWhereUniqueWithoutResourceCategoryInput[]
    createMany?: ResourceEditSuggestionCreateManyResourceCategoryInputEnvelope
    set?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    disconnect?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    delete?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    connect?: ResourceEditSuggestionWhereUniqueInput | ResourceEditSuggestionWhereUniqueInput[]
    update?: ResourceEditSuggestionUpdateWithWhereUniqueWithoutResourceCategoryInput | ResourceEditSuggestionUpdateWithWhereUniqueWithoutResourceCategoryInput[]
    updateMany?: ResourceEditSuggestionUpdateManyWithWhereWithoutResourceCategoryInput | ResourceEditSuggestionUpdateManyWithWhereWithoutResourceCategoryInput[]
    deleteMany?: ResourceEditSuggestionScalarWhereInput | ResourceEditSuggestionScalarWhereInput[]
  }

  export type ResourceCategoryCreateNestedOneWithoutResourceEditSuggestionInput = {
    create?: XOR<ResourceCategoryCreateWithoutResourceEditSuggestionInput, ResourceCategoryUncheckedCreateWithoutResourceEditSuggestionInput>
    connectOrCreate?: ResourceCategoryCreateOrConnectWithoutResourceEditSuggestionInput
    connect?: ResourceCategoryWhereUniqueInput
  }

  export type ResourceCreateNestedOneWithoutResourceEditSuggestionInput = {
    create?: XOR<ResourceCreateWithoutResourceEditSuggestionInput, ResourceUncheckedCreateWithoutResourceEditSuggestionInput>
    connectOrCreate?: ResourceCreateOrConnectWithoutResourceEditSuggestionInput
    connect?: ResourceWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutResourceEditSuggestionInput = {
    create?: XOR<UserCreateWithoutResourceEditSuggestionInput, UserUncheckedCreateWithoutResourceEditSuggestionInput>
    connectOrCreate?: UserCreateOrConnectWithoutResourceEditSuggestionInput
    connect?: UserWhereUniqueInput
  }

  export type ResourceCategoryUpdateOneWithoutResourceEditSuggestionNestedInput = {
    create?: XOR<ResourceCategoryCreateWithoutResourceEditSuggestionInput, ResourceCategoryUncheckedCreateWithoutResourceEditSuggestionInput>
    connectOrCreate?: ResourceCategoryCreateOrConnectWithoutResourceEditSuggestionInput
    upsert?: ResourceCategoryUpsertWithoutResourceEditSuggestionInput
    disconnect?: ResourceCategoryWhereInput | boolean
    delete?: ResourceCategoryWhereInput | boolean
    connect?: ResourceCategoryWhereUniqueInput
    update?: XOR<XOR<ResourceCategoryUpdateToOneWithWhereWithoutResourceEditSuggestionInput, ResourceCategoryUpdateWithoutResourceEditSuggestionInput>, ResourceCategoryUncheckedUpdateWithoutResourceEditSuggestionInput>
  }

  export type ResourceUpdateOneRequiredWithoutResourceEditSuggestionNestedInput = {
    create?: XOR<ResourceCreateWithoutResourceEditSuggestionInput, ResourceUncheckedCreateWithoutResourceEditSuggestionInput>
    connectOrCreate?: ResourceCreateOrConnectWithoutResourceEditSuggestionInput
    upsert?: ResourceUpsertWithoutResourceEditSuggestionInput
    connect?: ResourceWhereUniqueInput
    update?: XOR<XOR<ResourceUpdateToOneWithWhereWithoutResourceEditSuggestionInput, ResourceUpdateWithoutResourceEditSuggestionInput>, ResourceUncheckedUpdateWithoutResourceEditSuggestionInput>
  }

  export type UserUpdateOneWithoutResourceEditSuggestionNestedInput = {
    create?: XOR<UserCreateWithoutResourceEditSuggestionInput, UserUncheckedCreateWithoutResourceEditSuggestionInput>
    connectOrCreate?: UserCreateOrConnectWithoutResourceEditSuggestionInput
    upsert?: UserUpsertWithoutResourceEditSuggestionInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutResourceEditSuggestionInput, UserUpdateWithoutResourceEditSuggestionInput>, UserUncheckedUpdateWithoutResourceEditSuggestionInput>
  }

  export type ResourceCreateNestedOneWithoutResourceLikeInput = {
    create?: XOR<ResourceCreateWithoutResourceLikeInput, ResourceUncheckedCreateWithoutResourceLikeInput>
    connectOrCreate?: ResourceCreateOrConnectWithoutResourceLikeInput
    connect?: ResourceWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutLikesInput = {
    create?: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikesInput
    connect?: UserWhereUniqueInput
  }

  export type ResourceUpdateOneRequiredWithoutResourceLikeNestedInput = {
    create?: XOR<ResourceCreateWithoutResourceLikeInput, ResourceUncheckedCreateWithoutResourceLikeInput>
    connectOrCreate?: ResourceCreateOrConnectWithoutResourceLikeInput
    upsert?: ResourceUpsertWithoutResourceLikeInput
    connect?: ResourceWhereUniqueInput
    update?: XOR<XOR<ResourceUpdateToOneWithWhereWithoutResourceLikeInput, ResourceUpdateWithoutResourceLikeInput>, ResourceUncheckedUpdateWithoutResourceLikeInput>
  }

  export type UserUpdateOneRequiredWithoutLikesNestedInput = {
    create?: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikesInput
    upsert?: UserUpsertWithoutLikesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLikesInput, UserUpdateWithoutLikesInput>, UserUncheckedUpdateWithoutLikesInput>
  }

  export type ResourceCreateNestedOneWithoutResourceReviewInput = {
    create?: XOR<ResourceCreateWithoutResourceReviewInput, ResourceUncheckedCreateWithoutResourceReviewInput>
    connectOrCreate?: ResourceCreateOrConnectWithoutResourceReviewInput
    connect?: ResourceWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReviewsInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    connect?: UserWhereUniqueInput
  }

  export type ResourceUpdateOneRequiredWithoutResourceReviewNestedInput = {
    create?: XOR<ResourceCreateWithoutResourceReviewInput, ResourceUncheckedCreateWithoutResourceReviewInput>
    connectOrCreate?: ResourceCreateOrConnectWithoutResourceReviewInput
    upsert?: ResourceUpsertWithoutResourceReviewInput
    connect?: ResourceWhereUniqueInput
    update?: XOR<XOR<ResourceUpdateToOneWithWhereWithoutResourceReviewInput, ResourceUpdateWithoutResourceReviewInput>, ResourceUncheckedUpdateWithoutResourceReviewInput>
  }

  export type UserUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    upsert?: UserUpsertWithoutReviewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewsInput, UserUpdateWithoutReviewsInput>, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumResourceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ResourceStatus | EnumResourceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResourceStatus[] | ListEnumResourceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResourceStatus[] | ListEnumResourceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumResourceStatusFilter<$PrismaModel> | $Enums.ResourceStatus
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumResourceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ResourceStatus | EnumResourceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResourceStatus[] | ListEnumResourceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResourceStatus[] | ListEnumResourceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumResourceStatusWithAggregatesFilter<$PrismaModel> | $Enums.ResourceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumResourceStatusFilter<$PrismaModel>
    _max?: NestedEnumResourceStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ResourceCreateWithoutUserInput = {
    name: string
    description?: string | null
    address: string
    city?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    facebookLink?: string | null
    email?: string | null
    status?: $Enums.ResourceStatus
    url?: string | null
    createdAt?: Date | string
    Location?: LocationCreateNestedManyWithoutResourceInput
    ResourceCategory?: ResourceCategoryCreateNestedOneWithoutResourceInput
    ResourceEditSuggestion?: ResourceEditSuggestionCreateNestedManyWithoutResourceInput
    ResourceLike?: ResourceLikeCreateNestedManyWithoutResourceInput
    ResourceReview?: ResourceReviewCreateNestedManyWithoutResourceInput
  }

  export type ResourceUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
    description?: string | null
    address: string
    city?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    facebookLink?: string | null
    email?: string | null
    status?: $Enums.ResourceStatus
    url?: string | null
    categoryId?: number | null
    createdAt?: Date | string
    Location?: LocationUncheckedCreateNestedManyWithoutResourceInput
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedCreateNestedManyWithoutResourceInput
    ResourceLike?: ResourceLikeUncheckedCreateNestedManyWithoutResourceInput
    ResourceReview?: ResourceReviewUncheckedCreateNestedManyWithoutResourceInput
  }

  export type ResourceCreateOrConnectWithoutUserInput = {
    where: ResourceWhereUniqueInput
    create: XOR<ResourceCreateWithoutUserInput, ResourceUncheckedCreateWithoutUserInput>
  }

  export type ResourceCreateManyUserInputEnvelope = {
    data: ResourceCreateManyUserInput | ResourceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ResourceEditSuggestionCreateWithoutUserInput = {
    name?: string | null
    address?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    url?: string | null
    createdAt?: Date | string
    status?: $Enums.ResourceStatus
    ResourceCategory?: ResourceCategoryCreateNestedOneWithoutResourceEditSuggestionInput
    resource: ResourceCreateNestedOneWithoutResourceEditSuggestionInput
  }

  export type ResourceEditSuggestionUncheckedCreateWithoutUserInput = {
    id?: number
    resourceId: number
    name?: string | null
    categoryId?: number | null
    address?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    url?: string | null
    createdAt?: Date | string
    status?: $Enums.ResourceStatus
  }

  export type ResourceEditSuggestionCreateOrConnectWithoutUserInput = {
    where: ResourceEditSuggestionWhereUniqueInput
    create: XOR<ResourceEditSuggestionCreateWithoutUserInput, ResourceEditSuggestionUncheckedCreateWithoutUserInput>
  }

  export type ResourceEditSuggestionCreateManyUserInputEnvelope = {
    data: ResourceEditSuggestionCreateManyUserInput | ResourceEditSuggestionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ResourceLikeCreateWithoutUserInput = {
    createdAt?: Date | string
    resource: ResourceCreateNestedOneWithoutResourceLikeInput
  }

  export type ResourceLikeUncheckedCreateWithoutUserInput = {
    id?: number
    resourceId: number
    createdAt?: Date | string
  }

  export type ResourceLikeCreateOrConnectWithoutUserInput = {
    where: ResourceLikeWhereUniqueInput
    create: XOR<ResourceLikeCreateWithoutUserInput, ResourceLikeUncheckedCreateWithoutUserInput>
  }

  export type ResourceLikeCreateManyUserInputEnvelope = {
    data: ResourceLikeCreateManyUserInput | ResourceLikeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ResourceReviewCreateWithoutUserInput = {
    rating: Decimal | DecimalJsLike | number | string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resource: ResourceCreateNestedOneWithoutResourceReviewInput
  }

  export type ResourceReviewUncheckedCreateWithoutUserInput = {
    id?: number
    resourceId: number
    rating: Decimal | DecimalJsLike | number | string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResourceReviewCreateOrConnectWithoutUserInput = {
    where: ResourceReviewWhereUniqueInput
    create: XOR<ResourceReviewCreateWithoutUserInput, ResourceReviewUncheckedCreateWithoutUserInput>
  }

  export type ResourceReviewCreateManyUserInputEnvelope = {
    data: ResourceReviewCreateManyUserInput | ResourceReviewCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ResourceUpsertWithWhereUniqueWithoutUserInput = {
    where: ResourceWhereUniqueInput
    update: XOR<ResourceUpdateWithoutUserInput, ResourceUncheckedUpdateWithoutUserInput>
    create: XOR<ResourceCreateWithoutUserInput, ResourceUncheckedCreateWithoutUserInput>
  }

  export type ResourceUpdateWithWhereUniqueWithoutUserInput = {
    where: ResourceWhereUniqueInput
    data: XOR<ResourceUpdateWithoutUserInput, ResourceUncheckedUpdateWithoutUserInput>
  }

  export type ResourceUpdateManyWithWhereWithoutUserInput = {
    where: ResourceScalarWhereInput
    data: XOR<ResourceUpdateManyMutationInput, ResourceUncheckedUpdateManyWithoutUserInput>
  }

  export type ResourceScalarWhereInput = {
    AND?: ResourceScalarWhereInput | ResourceScalarWhereInput[]
    OR?: ResourceScalarWhereInput[]
    NOT?: ResourceScalarWhereInput | ResourceScalarWhereInput[]
    id?: IntFilter<"Resource"> | number
    name?: StringFilter<"Resource"> | string
    description?: StringNullableFilter<"Resource"> | string | null
    address?: StringFilter<"Resource"> | string
    city?: StringNullableFilter<"Resource"> | string | null
    openDays?: StringNullableFilter<"Resource"> | string | null
    openTime?: DateTimeNullableFilter<"Resource"> | Date | string | null
    closeTime?: DateTimeNullableFilter<"Resource"> | Date | string | null
    phone?: StringNullableFilter<"Resource"> | string | null
    rating?: DecimalFilter<"Resource"> | Decimal | DecimalJsLike | number | string
    imageUrl?: StringNullableFilter<"Resource"> | string | null
    facebookLink?: StringNullableFilter<"Resource"> | string | null
    email?: StringNullableFilter<"Resource"> | string | null
    status?: EnumResourceStatusFilter<"Resource"> | $Enums.ResourceStatus
    url?: StringNullableFilter<"Resource"> | string | null
    categoryId?: IntNullableFilter<"Resource"> | number | null
    createdById?: IntNullableFilter<"Resource"> | number | null
    createdAt?: DateTimeFilter<"Resource"> | Date | string
  }

  export type ResourceEditSuggestionUpsertWithWhereUniqueWithoutUserInput = {
    where: ResourceEditSuggestionWhereUniqueInput
    update: XOR<ResourceEditSuggestionUpdateWithoutUserInput, ResourceEditSuggestionUncheckedUpdateWithoutUserInput>
    create: XOR<ResourceEditSuggestionCreateWithoutUserInput, ResourceEditSuggestionUncheckedCreateWithoutUserInput>
  }

  export type ResourceEditSuggestionUpdateWithWhereUniqueWithoutUserInput = {
    where: ResourceEditSuggestionWhereUniqueInput
    data: XOR<ResourceEditSuggestionUpdateWithoutUserInput, ResourceEditSuggestionUncheckedUpdateWithoutUserInput>
  }

  export type ResourceEditSuggestionUpdateManyWithWhereWithoutUserInput = {
    where: ResourceEditSuggestionScalarWhereInput
    data: XOR<ResourceEditSuggestionUpdateManyMutationInput, ResourceEditSuggestionUncheckedUpdateManyWithoutUserInput>
  }

  export type ResourceEditSuggestionScalarWhereInput = {
    AND?: ResourceEditSuggestionScalarWhereInput | ResourceEditSuggestionScalarWhereInput[]
    OR?: ResourceEditSuggestionScalarWhereInput[]
    NOT?: ResourceEditSuggestionScalarWhereInput | ResourceEditSuggestionScalarWhereInput[]
    id?: IntFilter<"ResourceEditSuggestion"> | number
    resourceId?: IntFilter<"ResourceEditSuggestion"> | number
    suggestedById?: IntNullableFilter<"ResourceEditSuggestion"> | number | null
    name?: StringNullableFilter<"ResourceEditSuggestion"> | string | null
    categoryId?: IntNullableFilter<"ResourceEditSuggestion"> | number | null
    address?: StringNullableFilter<"ResourceEditSuggestion"> | string | null
    openDays?: StringNullableFilter<"ResourceEditSuggestion"> | string | null
    openTime?: DateTimeNullableFilter<"ResourceEditSuggestion"> | Date | string | null
    closeTime?: DateTimeNullableFilter<"ResourceEditSuggestion"> | Date | string | null
    phone?: StringNullableFilter<"ResourceEditSuggestion"> | string | null
    url?: StringNullableFilter<"ResourceEditSuggestion"> | string | null
    createdAt?: DateTimeFilter<"ResourceEditSuggestion"> | Date | string
    status?: EnumResourceStatusFilter<"ResourceEditSuggestion"> | $Enums.ResourceStatus
  }

  export type ResourceLikeUpsertWithWhereUniqueWithoutUserInput = {
    where: ResourceLikeWhereUniqueInput
    update: XOR<ResourceLikeUpdateWithoutUserInput, ResourceLikeUncheckedUpdateWithoutUserInput>
    create: XOR<ResourceLikeCreateWithoutUserInput, ResourceLikeUncheckedCreateWithoutUserInput>
  }

  export type ResourceLikeUpdateWithWhereUniqueWithoutUserInput = {
    where: ResourceLikeWhereUniqueInput
    data: XOR<ResourceLikeUpdateWithoutUserInput, ResourceLikeUncheckedUpdateWithoutUserInput>
  }

  export type ResourceLikeUpdateManyWithWhereWithoutUserInput = {
    where: ResourceLikeScalarWhereInput
    data: XOR<ResourceLikeUpdateManyMutationInput, ResourceLikeUncheckedUpdateManyWithoutUserInput>
  }

  export type ResourceLikeScalarWhereInput = {
    AND?: ResourceLikeScalarWhereInput | ResourceLikeScalarWhereInput[]
    OR?: ResourceLikeScalarWhereInput[]
    NOT?: ResourceLikeScalarWhereInput | ResourceLikeScalarWhereInput[]
    id?: IntFilter<"ResourceLike"> | number
    resourceId?: IntFilter<"ResourceLike"> | number
    userId?: IntFilter<"ResourceLike"> | number
    createdAt?: DateTimeFilter<"ResourceLike"> | Date | string
  }

  export type ResourceReviewUpsertWithWhereUniqueWithoutUserInput = {
    where: ResourceReviewWhereUniqueInput
    update: XOR<ResourceReviewUpdateWithoutUserInput, ResourceReviewUncheckedUpdateWithoutUserInput>
    create: XOR<ResourceReviewCreateWithoutUserInput, ResourceReviewUncheckedCreateWithoutUserInput>
  }

  export type ResourceReviewUpdateWithWhereUniqueWithoutUserInput = {
    where: ResourceReviewWhereUniqueInput
    data: XOR<ResourceReviewUpdateWithoutUserInput, ResourceReviewUncheckedUpdateWithoutUserInput>
  }

  export type ResourceReviewUpdateManyWithWhereWithoutUserInput = {
    where: ResourceReviewScalarWhereInput
    data: XOR<ResourceReviewUpdateManyMutationInput, ResourceReviewUncheckedUpdateManyWithoutUserInput>
  }

  export type ResourceReviewScalarWhereInput = {
    AND?: ResourceReviewScalarWhereInput | ResourceReviewScalarWhereInput[]
    OR?: ResourceReviewScalarWhereInput[]
    NOT?: ResourceReviewScalarWhereInput | ResourceReviewScalarWhereInput[]
    id?: IntFilter<"ResourceReview"> | number
    resourceId?: IntFilter<"ResourceReview"> | number
    userId?: IntFilter<"ResourceReview"> | number
    rating?: DecimalFilter<"ResourceReview"> | Decimal | DecimalJsLike | number | string
    content?: StringNullableFilter<"ResourceReview"> | string | null
    createdAt?: DateTimeFilter<"ResourceReview"> | Date | string
    updatedAt?: DateTimeFilter<"ResourceReview"> | Date | string
  }

  export type ResourceCreateWithoutLocationInput = {
    name: string
    description?: string | null
    address: string
    city?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    facebookLink?: string | null
    email?: string | null
    status?: $Enums.ResourceStatus
    url?: string | null
    createdAt?: Date | string
    ResourceCategory?: ResourceCategoryCreateNestedOneWithoutResourceInput
    User?: UserCreateNestedOneWithoutResourcesInput
    ResourceEditSuggestion?: ResourceEditSuggestionCreateNestedManyWithoutResourceInput
    ResourceLike?: ResourceLikeCreateNestedManyWithoutResourceInput
    ResourceReview?: ResourceReviewCreateNestedManyWithoutResourceInput
  }

  export type ResourceUncheckedCreateWithoutLocationInput = {
    id?: number
    name: string
    description?: string | null
    address: string
    city?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    facebookLink?: string | null
    email?: string | null
    status?: $Enums.ResourceStatus
    url?: string | null
    categoryId?: number | null
    createdById?: number | null
    createdAt?: Date | string
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedCreateNestedManyWithoutResourceInput
    ResourceLike?: ResourceLikeUncheckedCreateNestedManyWithoutResourceInput
    ResourceReview?: ResourceReviewUncheckedCreateNestedManyWithoutResourceInput
  }

  export type ResourceCreateOrConnectWithoutLocationInput = {
    where: ResourceWhereUniqueInput
    create: XOR<ResourceCreateWithoutLocationInput, ResourceUncheckedCreateWithoutLocationInput>
  }

  export type ResourceUpsertWithoutLocationInput = {
    update: XOR<ResourceUpdateWithoutLocationInput, ResourceUncheckedUpdateWithoutLocationInput>
    create: XOR<ResourceCreateWithoutLocationInput, ResourceUncheckedCreateWithoutLocationInput>
    where?: ResourceWhereInput
  }

  export type ResourceUpdateToOneWithWhereWithoutLocationInput = {
    where?: ResourceWhereInput
    data: XOR<ResourceUpdateWithoutLocationInput, ResourceUncheckedUpdateWithoutLocationInput>
  }

  export type ResourceUpdateWithoutLocationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookLink?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ResourceCategory?: ResourceCategoryUpdateOneWithoutResourceNestedInput
    User?: UserUpdateOneWithoutResourcesNestedInput
    ResourceEditSuggestion?: ResourceEditSuggestionUpdateManyWithoutResourceNestedInput
    ResourceLike?: ResourceLikeUpdateManyWithoutResourceNestedInput
    ResourceReview?: ResourceReviewUpdateManyWithoutResourceNestedInput
  }

  export type ResourceUncheckedUpdateWithoutLocationInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookLink?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    createdById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedUpdateManyWithoutResourceNestedInput
    ResourceLike?: ResourceLikeUncheckedUpdateManyWithoutResourceNestedInput
    ResourceReview?: ResourceReviewUncheckedUpdateManyWithoutResourceNestedInput
  }

  export type LocationCreateWithoutResourceInput = {
    latitude: number
    longitude: number
  }

  export type LocationUncheckedCreateWithoutResourceInput = {
    id?: number
    latitude: number
    longitude: number
  }

  export type LocationCreateOrConnectWithoutResourceInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutResourceInput, LocationUncheckedCreateWithoutResourceInput>
  }

  export type LocationCreateManyResourceInputEnvelope = {
    data: LocationCreateManyResourceInput | LocationCreateManyResourceInput[]
    skipDuplicates?: boolean
  }

  export type ResourceCategoryCreateWithoutResourceInput = {
    name: string
    ResourceEditSuggestion?: ResourceEditSuggestionCreateNestedManyWithoutResourceCategoryInput
  }

  export type ResourceCategoryUncheckedCreateWithoutResourceInput = {
    id?: number
    name: string
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedCreateNestedManyWithoutResourceCategoryInput
  }

  export type ResourceCategoryCreateOrConnectWithoutResourceInput = {
    where: ResourceCategoryWhereUniqueInput
    create: XOR<ResourceCategoryCreateWithoutResourceInput, ResourceCategoryUncheckedCreateWithoutResourceInput>
  }

  export type UserCreateWithoutResourcesInput = {
    firstName: string
    lastName: string
    email: string
    password: string
    image?: string | null
    role?: $Enums.Role
    isVerified?: boolean
    forgotPasswordToken?: string | null
    forgotPasswordTokenExpiry?: Date | string | null
    verifyToken?: string | null
    verifyTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ResourceEditSuggestion?: ResourceEditSuggestionCreateNestedManyWithoutUserInput
    likes?: ResourceLikeCreateNestedManyWithoutUserInput
    reviews?: ResourceReviewCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutResourcesInput = {
    id?: number
    firstName: string
    lastName: string
    email: string
    password: string
    image?: string | null
    role?: $Enums.Role
    isVerified?: boolean
    forgotPasswordToken?: string | null
    forgotPasswordTokenExpiry?: Date | string | null
    verifyToken?: string | null
    verifyTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedCreateNestedManyWithoutUserInput
    likes?: ResourceLikeUncheckedCreateNestedManyWithoutUserInput
    reviews?: ResourceReviewUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutResourcesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutResourcesInput, UserUncheckedCreateWithoutResourcesInput>
  }

  export type ResourceEditSuggestionCreateWithoutResourceInput = {
    name?: string | null
    address?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    url?: string | null
    createdAt?: Date | string
    status?: $Enums.ResourceStatus
    ResourceCategory?: ResourceCategoryCreateNestedOneWithoutResourceEditSuggestionInput
    User?: UserCreateNestedOneWithoutResourceEditSuggestionInput
  }

  export type ResourceEditSuggestionUncheckedCreateWithoutResourceInput = {
    id?: number
    suggestedById?: number | null
    name?: string | null
    categoryId?: number | null
    address?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    url?: string | null
    createdAt?: Date | string
    status?: $Enums.ResourceStatus
  }

  export type ResourceEditSuggestionCreateOrConnectWithoutResourceInput = {
    where: ResourceEditSuggestionWhereUniqueInput
    create: XOR<ResourceEditSuggestionCreateWithoutResourceInput, ResourceEditSuggestionUncheckedCreateWithoutResourceInput>
  }

  export type ResourceEditSuggestionCreateManyResourceInputEnvelope = {
    data: ResourceEditSuggestionCreateManyResourceInput | ResourceEditSuggestionCreateManyResourceInput[]
    skipDuplicates?: boolean
  }

  export type ResourceLikeCreateWithoutResourceInput = {
    createdAt?: Date | string
    User: UserCreateNestedOneWithoutLikesInput
  }

  export type ResourceLikeUncheckedCreateWithoutResourceInput = {
    id?: number
    userId: number
    createdAt?: Date | string
  }

  export type ResourceLikeCreateOrConnectWithoutResourceInput = {
    where: ResourceLikeWhereUniqueInput
    create: XOR<ResourceLikeCreateWithoutResourceInput, ResourceLikeUncheckedCreateWithoutResourceInput>
  }

  export type ResourceLikeCreateManyResourceInputEnvelope = {
    data: ResourceLikeCreateManyResourceInput | ResourceLikeCreateManyResourceInput[]
    skipDuplicates?: boolean
  }

  export type ResourceReviewCreateWithoutResourceInput = {
    rating: Decimal | DecimalJsLike | number | string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutReviewsInput
  }

  export type ResourceReviewUncheckedCreateWithoutResourceInput = {
    id?: number
    userId: number
    rating: Decimal | DecimalJsLike | number | string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResourceReviewCreateOrConnectWithoutResourceInput = {
    where: ResourceReviewWhereUniqueInput
    create: XOR<ResourceReviewCreateWithoutResourceInput, ResourceReviewUncheckedCreateWithoutResourceInput>
  }

  export type ResourceReviewCreateManyResourceInputEnvelope = {
    data: ResourceReviewCreateManyResourceInput | ResourceReviewCreateManyResourceInput[]
    skipDuplicates?: boolean
  }

  export type LocationUpsertWithWhereUniqueWithoutResourceInput = {
    where: LocationWhereUniqueInput
    update: XOR<LocationUpdateWithoutResourceInput, LocationUncheckedUpdateWithoutResourceInput>
    create: XOR<LocationCreateWithoutResourceInput, LocationUncheckedCreateWithoutResourceInput>
  }

  export type LocationUpdateWithWhereUniqueWithoutResourceInput = {
    where: LocationWhereUniqueInput
    data: XOR<LocationUpdateWithoutResourceInput, LocationUncheckedUpdateWithoutResourceInput>
  }

  export type LocationUpdateManyWithWhereWithoutResourceInput = {
    where: LocationScalarWhereInput
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyWithoutResourceInput>
  }

  export type LocationScalarWhereInput = {
    AND?: LocationScalarWhereInput | LocationScalarWhereInput[]
    OR?: LocationScalarWhereInput[]
    NOT?: LocationScalarWhereInput | LocationScalarWhereInput[]
    id?: IntFilter<"Location"> | number
    resourceId?: IntFilter<"Location"> | number
    latitude?: FloatFilter<"Location"> | number
    longitude?: FloatFilter<"Location"> | number
  }

  export type ResourceCategoryUpsertWithoutResourceInput = {
    update: XOR<ResourceCategoryUpdateWithoutResourceInput, ResourceCategoryUncheckedUpdateWithoutResourceInput>
    create: XOR<ResourceCategoryCreateWithoutResourceInput, ResourceCategoryUncheckedCreateWithoutResourceInput>
    where?: ResourceCategoryWhereInput
  }

  export type ResourceCategoryUpdateToOneWithWhereWithoutResourceInput = {
    where?: ResourceCategoryWhereInput
    data: XOR<ResourceCategoryUpdateWithoutResourceInput, ResourceCategoryUncheckedUpdateWithoutResourceInput>
  }

  export type ResourceCategoryUpdateWithoutResourceInput = {
    name?: StringFieldUpdateOperationsInput | string
    ResourceEditSuggestion?: ResourceEditSuggestionUpdateManyWithoutResourceCategoryNestedInput
  }

  export type ResourceCategoryUncheckedUpdateWithoutResourceInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedUpdateManyWithoutResourceCategoryNestedInput
  }

  export type UserUpsertWithoutResourcesInput = {
    update: XOR<UserUpdateWithoutResourcesInput, UserUncheckedUpdateWithoutResourcesInput>
    create: XOR<UserCreateWithoutResourcesInput, UserUncheckedCreateWithoutResourcesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutResourcesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutResourcesInput, UserUncheckedUpdateWithoutResourcesInput>
  }

  export type UserUpdateWithoutResourcesInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    forgotPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    forgotPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifyToken?: NullableStringFieldUpdateOperationsInput | string | null
    verifyTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ResourceEditSuggestion?: ResourceEditSuggestionUpdateManyWithoutUserNestedInput
    likes?: ResourceLikeUpdateManyWithoutUserNestedInput
    reviews?: ResourceReviewUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutResourcesInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    forgotPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    forgotPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifyToken?: NullableStringFieldUpdateOperationsInput | string | null
    verifyTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedUpdateManyWithoutUserNestedInput
    likes?: ResourceLikeUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ResourceReviewUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ResourceEditSuggestionUpsertWithWhereUniqueWithoutResourceInput = {
    where: ResourceEditSuggestionWhereUniqueInput
    update: XOR<ResourceEditSuggestionUpdateWithoutResourceInput, ResourceEditSuggestionUncheckedUpdateWithoutResourceInput>
    create: XOR<ResourceEditSuggestionCreateWithoutResourceInput, ResourceEditSuggestionUncheckedCreateWithoutResourceInput>
  }

  export type ResourceEditSuggestionUpdateWithWhereUniqueWithoutResourceInput = {
    where: ResourceEditSuggestionWhereUniqueInput
    data: XOR<ResourceEditSuggestionUpdateWithoutResourceInput, ResourceEditSuggestionUncheckedUpdateWithoutResourceInput>
  }

  export type ResourceEditSuggestionUpdateManyWithWhereWithoutResourceInput = {
    where: ResourceEditSuggestionScalarWhereInput
    data: XOR<ResourceEditSuggestionUpdateManyMutationInput, ResourceEditSuggestionUncheckedUpdateManyWithoutResourceInput>
  }

  export type ResourceLikeUpsertWithWhereUniqueWithoutResourceInput = {
    where: ResourceLikeWhereUniqueInput
    update: XOR<ResourceLikeUpdateWithoutResourceInput, ResourceLikeUncheckedUpdateWithoutResourceInput>
    create: XOR<ResourceLikeCreateWithoutResourceInput, ResourceLikeUncheckedCreateWithoutResourceInput>
  }

  export type ResourceLikeUpdateWithWhereUniqueWithoutResourceInput = {
    where: ResourceLikeWhereUniqueInput
    data: XOR<ResourceLikeUpdateWithoutResourceInput, ResourceLikeUncheckedUpdateWithoutResourceInput>
  }

  export type ResourceLikeUpdateManyWithWhereWithoutResourceInput = {
    where: ResourceLikeScalarWhereInput
    data: XOR<ResourceLikeUpdateManyMutationInput, ResourceLikeUncheckedUpdateManyWithoutResourceInput>
  }

  export type ResourceReviewUpsertWithWhereUniqueWithoutResourceInput = {
    where: ResourceReviewWhereUniqueInput
    update: XOR<ResourceReviewUpdateWithoutResourceInput, ResourceReviewUncheckedUpdateWithoutResourceInput>
    create: XOR<ResourceReviewCreateWithoutResourceInput, ResourceReviewUncheckedCreateWithoutResourceInput>
  }

  export type ResourceReviewUpdateWithWhereUniqueWithoutResourceInput = {
    where: ResourceReviewWhereUniqueInput
    data: XOR<ResourceReviewUpdateWithoutResourceInput, ResourceReviewUncheckedUpdateWithoutResourceInput>
  }

  export type ResourceReviewUpdateManyWithWhereWithoutResourceInput = {
    where: ResourceReviewScalarWhereInput
    data: XOR<ResourceReviewUpdateManyMutationInput, ResourceReviewUncheckedUpdateManyWithoutResourceInput>
  }

  export type ResourceCreateWithoutResourceCategoryInput = {
    name: string
    description?: string | null
    address: string
    city?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    facebookLink?: string | null
    email?: string | null
    status?: $Enums.ResourceStatus
    url?: string | null
    createdAt?: Date | string
    Location?: LocationCreateNestedManyWithoutResourceInput
    User?: UserCreateNestedOneWithoutResourcesInput
    ResourceEditSuggestion?: ResourceEditSuggestionCreateNestedManyWithoutResourceInput
    ResourceLike?: ResourceLikeCreateNestedManyWithoutResourceInput
    ResourceReview?: ResourceReviewCreateNestedManyWithoutResourceInput
  }

  export type ResourceUncheckedCreateWithoutResourceCategoryInput = {
    id?: number
    name: string
    description?: string | null
    address: string
    city?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    facebookLink?: string | null
    email?: string | null
    status?: $Enums.ResourceStatus
    url?: string | null
    createdById?: number | null
    createdAt?: Date | string
    Location?: LocationUncheckedCreateNestedManyWithoutResourceInput
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedCreateNestedManyWithoutResourceInput
    ResourceLike?: ResourceLikeUncheckedCreateNestedManyWithoutResourceInput
    ResourceReview?: ResourceReviewUncheckedCreateNestedManyWithoutResourceInput
  }

  export type ResourceCreateOrConnectWithoutResourceCategoryInput = {
    where: ResourceWhereUniqueInput
    create: XOR<ResourceCreateWithoutResourceCategoryInput, ResourceUncheckedCreateWithoutResourceCategoryInput>
  }

  export type ResourceCreateManyResourceCategoryInputEnvelope = {
    data: ResourceCreateManyResourceCategoryInput | ResourceCreateManyResourceCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ResourceEditSuggestionCreateWithoutResourceCategoryInput = {
    name?: string | null
    address?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    url?: string | null
    createdAt?: Date | string
    status?: $Enums.ResourceStatus
    resource: ResourceCreateNestedOneWithoutResourceEditSuggestionInput
    User?: UserCreateNestedOneWithoutResourceEditSuggestionInput
  }

  export type ResourceEditSuggestionUncheckedCreateWithoutResourceCategoryInput = {
    id?: number
    resourceId: number
    suggestedById?: number | null
    name?: string | null
    address?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    url?: string | null
    createdAt?: Date | string
    status?: $Enums.ResourceStatus
  }

  export type ResourceEditSuggestionCreateOrConnectWithoutResourceCategoryInput = {
    where: ResourceEditSuggestionWhereUniqueInput
    create: XOR<ResourceEditSuggestionCreateWithoutResourceCategoryInput, ResourceEditSuggestionUncheckedCreateWithoutResourceCategoryInput>
  }

  export type ResourceEditSuggestionCreateManyResourceCategoryInputEnvelope = {
    data: ResourceEditSuggestionCreateManyResourceCategoryInput | ResourceEditSuggestionCreateManyResourceCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ResourceUpsertWithWhereUniqueWithoutResourceCategoryInput = {
    where: ResourceWhereUniqueInput
    update: XOR<ResourceUpdateWithoutResourceCategoryInput, ResourceUncheckedUpdateWithoutResourceCategoryInput>
    create: XOR<ResourceCreateWithoutResourceCategoryInput, ResourceUncheckedCreateWithoutResourceCategoryInput>
  }

  export type ResourceUpdateWithWhereUniqueWithoutResourceCategoryInput = {
    where: ResourceWhereUniqueInput
    data: XOR<ResourceUpdateWithoutResourceCategoryInput, ResourceUncheckedUpdateWithoutResourceCategoryInput>
  }

  export type ResourceUpdateManyWithWhereWithoutResourceCategoryInput = {
    where: ResourceScalarWhereInput
    data: XOR<ResourceUpdateManyMutationInput, ResourceUncheckedUpdateManyWithoutResourceCategoryInput>
  }

  export type ResourceEditSuggestionUpsertWithWhereUniqueWithoutResourceCategoryInput = {
    where: ResourceEditSuggestionWhereUniqueInput
    update: XOR<ResourceEditSuggestionUpdateWithoutResourceCategoryInput, ResourceEditSuggestionUncheckedUpdateWithoutResourceCategoryInput>
    create: XOR<ResourceEditSuggestionCreateWithoutResourceCategoryInput, ResourceEditSuggestionUncheckedCreateWithoutResourceCategoryInput>
  }

  export type ResourceEditSuggestionUpdateWithWhereUniqueWithoutResourceCategoryInput = {
    where: ResourceEditSuggestionWhereUniqueInput
    data: XOR<ResourceEditSuggestionUpdateWithoutResourceCategoryInput, ResourceEditSuggestionUncheckedUpdateWithoutResourceCategoryInput>
  }

  export type ResourceEditSuggestionUpdateManyWithWhereWithoutResourceCategoryInput = {
    where: ResourceEditSuggestionScalarWhereInput
    data: XOR<ResourceEditSuggestionUpdateManyMutationInput, ResourceEditSuggestionUncheckedUpdateManyWithoutResourceCategoryInput>
  }

  export type ResourceCategoryCreateWithoutResourceEditSuggestionInput = {
    name: string
    Resource?: ResourceCreateNestedManyWithoutResourceCategoryInput
  }

  export type ResourceCategoryUncheckedCreateWithoutResourceEditSuggestionInput = {
    id?: number
    name: string
    Resource?: ResourceUncheckedCreateNestedManyWithoutResourceCategoryInput
  }

  export type ResourceCategoryCreateOrConnectWithoutResourceEditSuggestionInput = {
    where: ResourceCategoryWhereUniqueInput
    create: XOR<ResourceCategoryCreateWithoutResourceEditSuggestionInput, ResourceCategoryUncheckedCreateWithoutResourceEditSuggestionInput>
  }

  export type ResourceCreateWithoutResourceEditSuggestionInput = {
    name: string
    description?: string | null
    address: string
    city?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    facebookLink?: string | null
    email?: string | null
    status?: $Enums.ResourceStatus
    url?: string | null
    createdAt?: Date | string
    Location?: LocationCreateNestedManyWithoutResourceInput
    ResourceCategory?: ResourceCategoryCreateNestedOneWithoutResourceInput
    User?: UserCreateNestedOneWithoutResourcesInput
    ResourceLike?: ResourceLikeCreateNestedManyWithoutResourceInput
    ResourceReview?: ResourceReviewCreateNestedManyWithoutResourceInput
  }

  export type ResourceUncheckedCreateWithoutResourceEditSuggestionInput = {
    id?: number
    name: string
    description?: string | null
    address: string
    city?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    facebookLink?: string | null
    email?: string | null
    status?: $Enums.ResourceStatus
    url?: string | null
    categoryId?: number | null
    createdById?: number | null
    createdAt?: Date | string
    Location?: LocationUncheckedCreateNestedManyWithoutResourceInput
    ResourceLike?: ResourceLikeUncheckedCreateNestedManyWithoutResourceInput
    ResourceReview?: ResourceReviewUncheckedCreateNestedManyWithoutResourceInput
  }

  export type ResourceCreateOrConnectWithoutResourceEditSuggestionInput = {
    where: ResourceWhereUniqueInput
    create: XOR<ResourceCreateWithoutResourceEditSuggestionInput, ResourceUncheckedCreateWithoutResourceEditSuggestionInput>
  }

  export type UserCreateWithoutResourceEditSuggestionInput = {
    firstName: string
    lastName: string
    email: string
    password: string
    image?: string | null
    role?: $Enums.Role
    isVerified?: boolean
    forgotPasswordToken?: string | null
    forgotPasswordTokenExpiry?: Date | string | null
    verifyToken?: string | null
    verifyTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resources?: ResourceCreateNestedManyWithoutUserInput
    likes?: ResourceLikeCreateNestedManyWithoutUserInput
    reviews?: ResourceReviewCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutResourceEditSuggestionInput = {
    id?: number
    firstName: string
    lastName: string
    email: string
    password: string
    image?: string | null
    role?: $Enums.Role
    isVerified?: boolean
    forgotPasswordToken?: string | null
    forgotPasswordTokenExpiry?: Date | string | null
    verifyToken?: string | null
    verifyTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resources?: ResourceUncheckedCreateNestedManyWithoutUserInput
    likes?: ResourceLikeUncheckedCreateNestedManyWithoutUserInput
    reviews?: ResourceReviewUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutResourceEditSuggestionInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutResourceEditSuggestionInput, UserUncheckedCreateWithoutResourceEditSuggestionInput>
  }

  export type ResourceCategoryUpsertWithoutResourceEditSuggestionInput = {
    update: XOR<ResourceCategoryUpdateWithoutResourceEditSuggestionInput, ResourceCategoryUncheckedUpdateWithoutResourceEditSuggestionInput>
    create: XOR<ResourceCategoryCreateWithoutResourceEditSuggestionInput, ResourceCategoryUncheckedCreateWithoutResourceEditSuggestionInput>
    where?: ResourceCategoryWhereInput
  }

  export type ResourceCategoryUpdateToOneWithWhereWithoutResourceEditSuggestionInput = {
    where?: ResourceCategoryWhereInput
    data: XOR<ResourceCategoryUpdateWithoutResourceEditSuggestionInput, ResourceCategoryUncheckedUpdateWithoutResourceEditSuggestionInput>
  }

  export type ResourceCategoryUpdateWithoutResourceEditSuggestionInput = {
    name?: StringFieldUpdateOperationsInput | string
    Resource?: ResourceUpdateManyWithoutResourceCategoryNestedInput
  }

  export type ResourceCategoryUncheckedUpdateWithoutResourceEditSuggestionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    Resource?: ResourceUncheckedUpdateManyWithoutResourceCategoryNestedInput
  }

  export type ResourceUpsertWithoutResourceEditSuggestionInput = {
    update: XOR<ResourceUpdateWithoutResourceEditSuggestionInput, ResourceUncheckedUpdateWithoutResourceEditSuggestionInput>
    create: XOR<ResourceCreateWithoutResourceEditSuggestionInput, ResourceUncheckedCreateWithoutResourceEditSuggestionInput>
    where?: ResourceWhereInput
  }

  export type ResourceUpdateToOneWithWhereWithoutResourceEditSuggestionInput = {
    where?: ResourceWhereInput
    data: XOR<ResourceUpdateWithoutResourceEditSuggestionInput, ResourceUncheckedUpdateWithoutResourceEditSuggestionInput>
  }

  export type ResourceUpdateWithoutResourceEditSuggestionInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookLink?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Location?: LocationUpdateManyWithoutResourceNestedInput
    ResourceCategory?: ResourceCategoryUpdateOneWithoutResourceNestedInput
    User?: UserUpdateOneWithoutResourcesNestedInput
    ResourceLike?: ResourceLikeUpdateManyWithoutResourceNestedInput
    ResourceReview?: ResourceReviewUpdateManyWithoutResourceNestedInput
  }

  export type ResourceUncheckedUpdateWithoutResourceEditSuggestionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookLink?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    createdById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Location?: LocationUncheckedUpdateManyWithoutResourceNestedInput
    ResourceLike?: ResourceLikeUncheckedUpdateManyWithoutResourceNestedInput
    ResourceReview?: ResourceReviewUncheckedUpdateManyWithoutResourceNestedInput
  }

  export type UserUpsertWithoutResourceEditSuggestionInput = {
    update: XOR<UserUpdateWithoutResourceEditSuggestionInput, UserUncheckedUpdateWithoutResourceEditSuggestionInput>
    create: XOR<UserCreateWithoutResourceEditSuggestionInput, UserUncheckedCreateWithoutResourceEditSuggestionInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutResourceEditSuggestionInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutResourceEditSuggestionInput, UserUncheckedUpdateWithoutResourceEditSuggestionInput>
  }

  export type UserUpdateWithoutResourceEditSuggestionInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    forgotPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    forgotPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifyToken?: NullableStringFieldUpdateOperationsInput | string | null
    verifyTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resources?: ResourceUpdateManyWithoutUserNestedInput
    likes?: ResourceLikeUpdateManyWithoutUserNestedInput
    reviews?: ResourceReviewUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutResourceEditSuggestionInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    forgotPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    forgotPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifyToken?: NullableStringFieldUpdateOperationsInput | string | null
    verifyTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resources?: ResourceUncheckedUpdateManyWithoutUserNestedInput
    likes?: ResourceLikeUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ResourceReviewUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ResourceCreateWithoutResourceLikeInput = {
    name: string
    description?: string | null
    address: string
    city?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    facebookLink?: string | null
    email?: string | null
    status?: $Enums.ResourceStatus
    url?: string | null
    createdAt?: Date | string
    Location?: LocationCreateNestedManyWithoutResourceInput
    ResourceCategory?: ResourceCategoryCreateNestedOneWithoutResourceInput
    User?: UserCreateNestedOneWithoutResourcesInput
    ResourceEditSuggestion?: ResourceEditSuggestionCreateNestedManyWithoutResourceInput
    ResourceReview?: ResourceReviewCreateNestedManyWithoutResourceInput
  }

  export type ResourceUncheckedCreateWithoutResourceLikeInput = {
    id?: number
    name: string
    description?: string | null
    address: string
    city?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    facebookLink?: string | null
    email?: string | null
    status?: $Enums.ResourceStatus
    url?: string | null
    categoryId?: number | null
    createdById?: number | null
    createdAt?: Date | string
    Location?: LocationUncheckedCreateNestedManyWithoutResourceInput
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedCreateNestedManyWithoutResourceInput
    ResourceReview?: ResourceReviewUncheckedCreateNestedManyWithoutResourceInput
  }

  export type ResourceCreateOrConnectWithoutResourceLikeInput = {
    where: ResourceWhereUniqueInput
    create: XOR<ResourceCreateWithoutResourceLikeInput, ResourceUncheckedCreateWithoutResourceLikeInput>
  }

  export type UserCreateWithoutLikesInput = {
    firstName: string
    lastName: string
    email: string
    password: string
    image?: string | null
    role?: $Enums.Role
    isVerified?: boolean
    forgotPasswordToken?: string | null
    forgotPasswordTokenExpiry?: Date | string | null
    verifyToken?: string | null
    verifyTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resources?: ResourceCreateNestedManyWithoutUserInput
    ResourceEditSuggestion?: ResourceEditSuggestionCreateNestedManyWithoutUserInput
    reviews?: ResourceReviewCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLikesInput = {
    id?: number
    firstName: string
    lastName: string
    email: string
    password: string
    image?: string | null
    role?: $Enums.Role
    isVerified?: boolean
    forgotPasswordToken?: string | null
    forgotPasswordTokenExpiry?: Date | string | null
    verifyToken?: string | null
    verifyTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resources?: ResourceUncheckedCreateNestedManyWithoutUserInput
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedCreateNestedManyWithoutUserInput
    reviews?: ResourceReviewUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLikesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
  }

  export type ResourceUpsertWithoutResourceLikeInput = {
    update: XOR<ResourceUpdateWithoutResourceLikeInput, ResourceUncheckedUpdateWithoutResourceLikeInput>
    create: XOR<ResourceCreateWithoutResourceLikeInput, ResourceUncheckedCreateWithoutResourceLikeInput>
    where?: ResourceWhereInput
  }

  export type ResourceUpdateToOneWithWhereWithoutResourceLikeInput = {
    where?: ResourceWhereInput
    data: XOR<ResourceUpdateWithoutResourceLikeInput, ResourceUncheckedUpdateWithoutResourceLikeInput>
  }

  export type ResourceUpdateWithoutResourceLikeInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookLink?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Location?: LocationUpdateManyWithoutResourceNestedInput
    ResourceCategory?: ResourceCategoryUpdateOneWithoutResourceNestedInput
    User?: UserUpdateOneWithoutResourcesNestedInput
    ResourceEditSuggestion?: ResourceEditSuggestionUpdateManyWithoutResourceNestedInput
    ResourceReview?: ResourceReviewUpdateManyWithoutResourceNestedInput
  }

  export type ResourceUncheckedUpdateWithoutResourceLikeInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookLink?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    createdById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Location?: LocationUncheckedUpdateManyWithoutResourceNestedInput
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedUpdateManyWithoutResourceNestedInput
    ResourceReview?: ResourceReviewUncheckedUpdateManyWithoutResourceNestedInput
  }

  export type UserUpsertWithoutLikesInput = {
    update: XOR<UserUpdateWithoutLikesInput, UserUncheckedUpdateWithoutLikesInput>
    create: XOR<UserCreateWithoutLikesInput, UserUncheckedCreateWithoutLikesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLikesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLikesInput, UserUncheckedUpdateWithoutLikesInput>
  }

  export type UserUpdateWithoutLikesInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    forgotPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    forgotPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifyToken?: NullableStringFieldUpdateOperationsInput | string | null
    verifyTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resources?: ResourceUpdateManyWithoutUserNestedInput
    ResourceEditSuggestion?: ResourceEditSuggestionUpdateManyWithoutUserNestedInput
    reviews?: ResourceReviewUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLikesInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    forgotPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    forgotPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifyToken?: NullableStringFieldUpdateOperationsInput | string | null
    verifyTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resources?: ResourceUncheckedUpdateManyWithoutUserNestedInput
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ResourceReviewUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ResourceCreateWithoutResourceReviewInput = {
    name: string
    description?: string | null
    address: string
    city?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    facebookLink?: string | null
    email?: string | null
    status?: $Enums.ResourceStatus
    url?: string | null
    createdAt?: Date | string
    Location?: LocationCreateNestedManyWithoutResourceInput
    ResourceCategory?: ResourceCategoryCreateNestedOneWithoutResourceInput
    User?: UserCreateNestedOneWithoutResourcesInput
    ResourceEditSuggestion?: ResourceEditSuggestionCreateNestedManyWithoutResourceInput
    ResourceLike?: ResourceLikeCreateNestedManyWithoutResourceInput
  }

  export type ResourceUncheckedCreateWithoutResourceReviewInput = {
    id?: number
    name: string
    description?: string | null
    address: string
    city?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    facebookLink?: string | null
    email?: string | null
    status?: $Enums.ResourceStatus
    url?: string | null
    categoryId?: number | null
    createdById?: number | null
    createdAt?: Date | string
    Location?: LocationUncheckedCreateNestedManyWithoutResourceInput
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedCreateNestedManyWithoutResourceInput
    ResourceLike?: ResourceLikeUncheckedCreateNestedManyWithoutResourceInput
  }

  export type ResourceCreateOrConnectWithoutResourceReviewInput = {
    where: ResourceWhereUniqueInput
    create: XOR<ResourceCreateWithoutResourceReviewInput, ResourceUncheckedCreateWithoutResourceReviewInput>
  }

  export type UserCreateWithoutReviewsInput = {
    firstName: string
    lastName: string
    email: string
    password: string
    image?: string | null
    role?: $Enums.Role
    isVerified?: boolean
    forgotPasswordToken?: string | null
    forgotPasswordTokenExpiry?: Date | string | null
    verifyToken?: string | null
    verifyTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resources?: ResourceCreateNestedManyWithoutUserInput
    ResourceEditSuggestion?: ResourceEditSuggestionCreateNestedManyWithoutUserInput
    likes?: ResourceLikeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReviewsInput = {
    id?: number
    firstName: string
    lastName: string
    email: string
    password: string
    image?: string | null
    role?: $Enums.Role
    isVerified?: boolean
    forgotPasswordToken?: string | null
    forgotPasswordTokenExpiry?: Date | string | null
    verifyToken?: string | null
    verifyTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    resources?: ResourceUncheckedCreateNestedManyWithoutUserInput
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedCreateNestedManyWithoutUserInput
    likes?: ResourceLikeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReviewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
  }

  export type ResourceUpsertWithoutResourceReviewInput = {
    update: XOR<ResourceUpdateWithoutResourceReviewInput, ResourceUncheckedUpdateWithoutResourceReviewInput>
    create: XOR<ResourceCreateWithoutResourceReviewInput, ResourceUncheckedCreateWithoutResourceReviewInput>
    where?: ResourceWhereInput
  }

  export type ResourceUpdateToOneWithWhereWithoutResourceReviewInput = {
    where?: ResourceWhereInput
    data: XOR<ResourceUpdateWithoutResourceReviewInput, ResourceUncheckedUpdateWithoutResourceReviewInput>
  }

  export type ResourceUpdateWithoutResourceReviewInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookLink?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Location?: LocationUpdateManyWithoutResourceNestedInput
    ResourceCategory?: ResourceCategoryUpdateOneWithoutResourceNestedInput
    User?: UserUpdateOneWithoutResourcesNestedInput
    ResourceEditSuggestion?: ResourceEditSuggestionUpdateManyWithoutResourceNestedInput
    ResourceLike?: ResourceLikeUpdateManyWithoutResourceNestedInput
  }

  export type ResourceUncheckedUpdateWithoutResourceReviewInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookLink?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    createdById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Location?: LocationUncheckedUpdateManyWithoutResourceNestedInput
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedUpdateManyWithoutResourceNestedInput
    ResourceLike?: ResourceLikeUncheckedUpdateManyWithoutResourceNestedInput
  }

  export type UserUpsertWithoutReviewsInput = {
    update: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type UserUpdateWithoutReviewsInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    forgotPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    forgotPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifyToken?: NullableStringFieldUpdateOperationsInput | string | null
    verifyTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resources?: ResourceUpdateManyWithoutUserNestedInput
    ResourceEditSuggestion?: ResourceEditSuggestionUpdateManyWithoutUserNestedInput
    likes?: ResourceLikeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewsInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    forgotPasswordToken?: NullableStringFieldUpdateOperationsInput | string | null
    forgotPasswordTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verifyToken?: NullableStringFieldUpdateOperationsInput | string | null
    verifyTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resources?: ResourceUncheckedUpdateManyWithoutUserNestedInput
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedUpdateManyWithoutUserNestedInput
    likes?: ResourceLikeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ResourceCreateManyUserInput = {
    id?: number
    name: string
    description?: string | null
    address: string
    city?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    facebookLink?: string | null
    email?: string | null
    status?: $Enums.ResourceStatus
    url?: string | null
    categoryId?: number | null
    createdAt?: Date | string
  }

  export type ResourceEditSuggestionCreateManyUserInput = {
    id?: number
    resourceId: number
    name?: string | null
    categoryId?: number | null
    address?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    url?: string | null
    createdAt?: Date | string
    status?: $Enums.ResourceStatus
  }

  export type ResourceLikeCreateManyUserInput = {
    id?: number
    resourceId: number
    createdAt?: Date | string
  }

  export type ResourceReviewCreateManyUserInput = {
    id?: number
    resourceId: number
    rating: Decimal | DecimalJsLike | number | string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResourceUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookLink?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Location?: LocationUpdateManyWithoutResourceNestedInput
    ResourceCategory?: ResourceCategoryUpdateOneWithoutResourceNestedInput
    ResourceEditSuggestion?: ResourceEditSuggestionUpdateManyWithoutResourceNestedInput
    ResourceLike?: ResourceLikeUpdateManyWithoutResourceNestedInput
    ResourceReview?: ResourceReviewUpdateManyWithoutResourceNestedInput
  }

  export type ResourceUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookLink?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Location?: LocationUncheckedUpdateManyWithoutResourceNestedInput
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedUpdateManyWithoutResourceNestedInput
    ResourceLike?: ResourceLikeUncheckedUpdateManyWithoutResourceNestedInput
    ResourceReview?: ResourceReviewUncheckedUpdateManyWithoutResourceNestedInput
  }

  export type ResourceUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookLink?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceEditSuggestionUpdateWithoutUserInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
    ResourceCategory?: ResourceCategoryUpdateOneWithoutResourceEditSuggestionNestedInput
    resource?: ResourceUpdateOneRequiredWithoutResourceEditSuggestionNestedInput
  }

  export type ResourceEditSuggestionUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    resourceId?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
  }

  export type ResourceEditSuggestionUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    resourceId?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
  }

  export type ResourceLikeUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resource?: ResourceUpdateOneRequiredWithoutResourceLikeNestedInput
  }

  export type ResourceLikeUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    resourceId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceLikeUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    resourceId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceReviewUpdateWithoutUserInput = {
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resource?: ResourceUpdateOneRequiredWithoutResourceReviewNestedInput
  }

  export type ResourceReviewUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    resourceId?: IntFieldUpdateOperationsInput | number
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceReviewUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    resourceId?: IntFieldUpdateOperationsInput | number
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationCreateManyResourceInput = {
    id?: number
    latitude: number
    longitude: number
  }

  export type ResourceEditSuggestionCreateManyResourceInput = {
    id?: number
    suggestedById?: number | null
    name?: string | null
    categoryId?: number | null
    address?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    url?: string | null
    createdAt?: Date | string
    status?: $Enums.ResourceStatus
  }

  export type ResourceLikeCreateManyResourceInput = {
    id?: number
    userId: number
    createdAt?: Date | string
  }

  export type ResourceReviewCreateManyResourceInput = {
    id?: number
    userId: number
    rating: Decimal | DecimalJsLike | number | string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LocationUpdateWithoutResourceInput = {
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
  }

  export type LocationUncheckedUpdateWithoutResourceInput = {
    id?: IntFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
  }

  export type LocationUncheckedUpdateManyWithoutResourceInput = {
    id?: IntFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
  }

  export type ResourceEditSuggestionUpdateWithoutResourceInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
    ResourceCategory?: ResourceCategoryUpdateOneWithoutResourceEditSuggestionNestedInput
    User?: UserUpdateOneWithoutResourceEditSuggestionNestedInput
  }

  export type ResourceEditSuggestionUncheckedUpdateWithoutResourceInput = {
    id?: IntFieldUpdateOperationsInput | number
    suggestedById?: NullableIntFieldUpdateOperationsInput | number | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
  }

  export type ResourceEditSuggestionUncheckedUpdateManyWithoutResourceInput = {
    id?: IntFieldUpdateOperationsInput | number
    suggestedById?: NullableIntFieldUpdateOperationsInput | number | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableIntFieldUpdateOperationsInput | number | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
  }

  export type ResourceLikeUpdateWithoutResourceInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutLikesNestedInput
  }

  export type ResourceLikeUncheckedUpdateWithoutResourceInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceLikeUncheckedUpdateManyWithoutResourceInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceReviewUpdateWithoutResourceInput = {
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ResourceReviewUncheckedUpdateWithoutResourceInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceReviewUncheckedUpdateManyWithoutResourceInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceCreateManyResourceCategoryInput = {
    id?: number
    name: string
    description?: string | null
    address: string
    city?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    rating?: Decimal | DecimalJsLike | number | string
    imageUrl?: string | null
    facebookLink?: string | null
    email?: string | null
    status?: $Enums.ResourceStatus
    url?: string | null
    createdById?: number | null
    createdAt?: Date | string
  }

  export type ResourceEditSuggestionCreateManyResourceCategoryInput = {
    id?: number
    resourceId: number
    suggestedById?: number | null
    name?: string | null
    address?: string | null
    openDays?: string | null
    openTime?: Date | string | null
    closeTime?: Date | string | null
    phone?: string | null
    url?: string | null
    createdAt?: Date | string
    status?: $Enums.ResourceStatus
  }

  export type ResourceUpdateWithoutResourceCategoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookLink?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Location?: LocationUpdateManyWithoutResourceNestedInput
    User?: UserUpdateOneWithoutResourcesNestedInput
    ResourceEditSuggestion?: ResourceEditSuggestionUpdateManyWithoutResourceNestedInput
    ResourceLike?: ResourceLikeUpdateManyWithoutResourceNestedInput
    ResourceReview?: ResourceReviewUpdateManyWithoutResourceNestedInput
  }

  export type ResourceUncheckedUpdateWithoutResourceCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookLink?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Location?: LocationUncheckedUpdateManyWithoutResourceNestedInput
    ResourceEditSuggestion?: ResourceEditSuggestionUncheckedUpdateManyWithoutResourceNestedInput
    ResourceLike?: ResourceLikeUncheckedUpdateManyWithoutResourceNestedInput
    ResourceReview?: ResourceReviewUncheckedUpdateManyWithoutResourceNestedInput
  }

  export type ResourceUncheckedUpdateManyWithoutResourceCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    facebookLink?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResourceEditSuggestionUpdateWithoutResourceCategoryInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
    resource?: ResourceUpdateOneRequiredWithoutResourceEditSuggestionNestedInput
    User?: UserUpdateOneWithoutResourceEditSuggestionNestedInput
  }

  export type ResourceEditSuggestionUncheckedUpdateWithoutResourceCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    resourceId?: IntFieldUpdateOperationsInput | number
    suggestedById?: NullableIntFieldUpdateOperationsInput | number | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
  }

  export type ResourceEditSuggestionUncheckedUpdateManyWithoutResourceCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    resourceId?: IntFieldUpdateOperationsInput | number
    suggestedById?: NullableIntFieldUpdateOperationsInput | number | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    openDays?: NullableStringFieldUpdateOperationsInput | string | null
    openTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closeTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumResourceStatusFieldUpdateOperationsInput | $Enums.ResourceStatus
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}