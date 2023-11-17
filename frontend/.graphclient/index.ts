// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import AutoPaginationTransform from "@graphprotocol/client-auto-pagination";
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { SecurityRegisterTypes } from './sources/SecurityRegister/types';
import * as importedModule$0 from "./sources/SecurityRegister/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  Int8: any;
};

export type Approval = {
  id: Scalars['Bytes'];
  owner: Scalars['Bytes'];
  approved: Scalars['Bytes'];
  tokenId: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type ApprovalForAll = {
  id: Scalars['Bytes'];
  owner: Scalars['Bytes'];
  operator: Scalars['Bytes'];
  approved: Scalars['Boolean'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type ApprovalForAll_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_gt?: InputMaybe<Scalars['Bytes']>;
  owner_lt?: InputMaybe<Scalars['Bytes']>;
  owner_gte?: InputMaybe<Scalars['Bytes']>;
  owner_lte?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  operator?: InputMaybe<Scalars['Bytes']>;
  operator_not?: InputMaybe<Scalars['Bytes']>;
  operator_gt?: InputMaybe<Scalars['Bytes']>;
  operator_lt?: InputMaybe<Scalars['Bytes']>;
  operator_gte?: InputMaybe<Scalars['Bytes']>;
  operator_lte?: InputMaybe<Scalars['Bytes']>;
  operator_in?: InputMaybe<Array<Scalars['Bytes']>>;
  operator_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  operator_contains?: InputMaybe<Scalars['Bytes']>;
  operator_not_contains?: InputMaybe<Scalars['Bytes']>;
  approved?: InputMaybe<Scalars['Boolean']>;
  approved_not?: InputMaybe<Scalars['Boolean']>;
  approved_in?: InputMaybe<Array<Scalars['Boolean']>>;
  approved_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ApprovalForAll_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ApprovalForAll_filter>>>;
};

export type ApprovalForAll_orderBy =
  | 'id'
  | 'owner'
  | 'operator'
  | 'approved'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Approval_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_gt?: InputMaybe<Scalars['Bytes']>;
  owner_lt?: InputMaybe<Scalars['Bytes']>;
  owner_gte?: InputMaybe<Scalars['Bytes']>;
  owner_lte?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  approved?: InputMaybe<Scalars['Bytes']>;
  approved_not?: InputMaybe<Scalars['Bytes']>;
  approved_gt?: InputMaybe<Scalars['Bytes']>;
  approved_lt?: InputMaybe<Scalars['Bytes']>;
  approved_gte?: InputMaybe<Scalars['Bytes']>;
  approved_lte?: InputMaybe<Scalars['Bytes']>;
  approved_in?: InputMaybe<Array<Scalars['Bytes']>>;
  approved_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  approved_contains?: InputMaybe<Scalars['Bytes']>;
  approved_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Approval_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Approval_filter>>>;
};

export type Approval_orderBy =
  | 'id'
  | 'owner'
  | 'approved'
  | 'tokenId'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type BatchMetadataUpdate = {
  id: Scalars['Bytes'];
  _fromTokenId: Scalars['BigInt'];
  _toTokenId: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type BatchMetadataUpdate_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  _fromTokenId?: InputMaybe<Scalars['BigInt']>;
  _fromTokenId_not?: InputMaybe<Scalars['BigInt']>;
  _fromTokenId_gt?: InputMaybe<Scalars['BigInt']>;
  _fromTokenId_lt?: InputMaybe<Scalars['BigInt']>;
  _fromTokenId_gte?: InputMaybe<Scalars['BigInt']>;
  _fromTokenId_lte?: InputMaybe<Scalars['BigInt']>;
  _fromTokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _fromTokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _toTokenId?: InputMaybe<Scalars['BigInt']>;
  _toTokenId_not?: InputMaybe<Scalars['BigInt']>;
  _toTokenId_gt?: InputMaybe<Scalars['BigInt']>;
  _toTokenId_lt?: InputMaybe<Scalars['BigInt']>;
  _toTokenId_gte?: InputMaybe<Scalars['BigInt']>;
  _toTokenId_lte?: InputMaybe<Scalars['BigInt']>;
  _toTokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _toTokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BatchMetadataUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<BatchMetadataUpdate_filter>>>;
};

export type BatchMetadataUpdate_orderBy =
  | 'id'
  | '_fromTokenId'
  | '_toTokenId'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type CompanyAccountUpdated = {
  id: Scalars['Bytes'];
  _company: Scalars['Bytes'];
  _account: Scalars['Bytes'];
  _name: Scalars['String'];
  _firstName: Scalars['String'];
  _action: Scalars['String'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type CompanyAccountUpdated_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  _company?: InputMaybe<Scalars['Bytes']>;
  _company_not?: InputMaybe<Scalars['Bytes']>;
  _company_gt?: InputMaybe<Scalars['Bytes']>;
  _company_lt?: InputMaybe<Scalars['Bytes']>;
  _company_gte?: InputMaybe<Scalars['Bytes']>;
  _company_lte?: InputMaybe<Scalars['Bytes']>;
  _company_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _company_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _company_contains?: InputMaybe<Scalars['Bytes']>;
  _company_not_contains?: InputMaybe<Scalars['Bytes']>;
  _account?: InputMaybe<Scalars['Bytes']>;
  _account_not?: InputMaybe<Scalars['Bytes']>;
  _account_gt?: InputMaybe<Scalars['Bytes']>;
  _account_lt?: InputMaybe<Scalars['Bytes']>;
  _account_gte?: InputMaybe<Scalars['Bytes']>;
  _account_lte?: InputMaybe<Scalars['Bytes']>;
  _account_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _account_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _account_contains?: InputMaybe<Scalars['Bytes']>;
  _account_not_contains?: InputMaybe<Scalars['Bytes']>;
  _name?: InputMaybe<Scalars['String']>;
  _name_not?: InputMaybe<Scalars['String']>;
  _name_gt?: InputMaybe<Scalars['String']>;
  _name_lt?: InputMaybe<Scalars['String']>;
  _name_gte?: InputMaybe<Scalars['String']>;
  _name_lte?: InputMaybe<Scalars['String']>;
  _name_in?: InputMaybe<Array<Scalars['String']>>;
  _name_not_in?: InputMaybe<Array<Scalars['String']>>;
  _name_contains?: InputMaybe<Scalars['String']>;
  _name_contains_nocase?: InputMaybe<Scalars['String']>;
  _name_not_contains?: InputMaybe<Scalars['String']>;
  _name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  _name_starts_with?: InputMaybe<Scalars['String']>;
  _name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _name_not_starts_with?: InputMaybe<Scalars['String']>;
  _name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _name_ends_with?: InputMaybe<Scalars['String']>;
  _name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _name_not_ends_with?: InputMaybe<Scalars['String']>;
  _name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _firstName?: InputMaybe<Scalars['String']>;
  _firstName_not?: InputMaybe<Scalars['String']>;
  _firstName_gt?: InputMaybe<Scalars['String']>;
  _firstName_lt?: InputMaybe<Scalars['String']>;
  _firstName_gte?: InputMaybe<Scalars['String']>;
  _firstName_lte?: InputMaybe<Scalars['String']>;
  _firstName_in?: InputMaybe<Array<Scalars['String']>>;
  _firstName_not_in?: InputMaybe<Array<Scalars['String']>>;
  _firstName_contains?: InputMaybe<Scalars['String']>;
  _firstName_contains_nocase?: InputMaybe<Scalars['String']>;
  _firstName_not_contains?: InputMaybe<Scalars['String']>;
  _firstName_not_contains_nocase?: InputMaybe<Scalars['String']>;
  _firstName_starts_with?: InputMaybe<Scalars['String']>;
  _firstName_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _firstName_not_starts_with?: InputMaybe<Scalars['String']>;
  _firstName_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _firstName_ends_with?: InputMaybe<Scalars['String']>;
  _firstName_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _firstName_not_ends_with?: InputMaybe<Scalars['String']>;
  _firstName_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _action?: InputMaybe<Scalars['String']>;
  _action_not?: InputMaybe<Scalars['String']>;
  _action_gt?: InputMaybe<Scalars['String']>;
  _action_lt?: InputMaybe<Scalars['String']>;
  _action_gte?: InputMaybe<Scalars['String']>;
  _action_lte?: InputMaybe<Scalars['String']>;
  _action_in?: InputMaybe<Array<Scalars['String']>>;
  _action_not_in?: InputMaybe<Array<Scalars['String']>>;
  _action_contains?: InputMaybe<Scalars['String']>;
  _action_contains_nocase?: InputMaybe<Scalars['String']>;
  _action_not_contains?: InputMaybe<Scalars['String']>;
  _action_not_contains_nocase?: InputMaybe<Scalars['String']>;
  _action_starts_with?: InputMaybe<Scalars['String']>;
  _action_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _action_not_starts_with?: InputMaybe<Scalars['String']>;
  _action_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _action_ends_with?: InputMaybe<Scalars['String']>;
  _action_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _action_not_ends_with?: InputMaybe<Scalars['String']>;
  _action_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<CompanyAccountUpdated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<CompanyAccountUpdated_filter>>>;
};

export type CompanyAccountUpdated_orderBy =
  | 'id'
  | '_company'
  | '_account'
  | '_name'
  | '_firstName'
  | '_action'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type MetadataUpdate = {
  id: Scalars['Bytes'];
  _tokenId: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type MetadataUpdate_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  _tokenId?: InputMaybe<Scalars['BigInt']>;
  _tokenId_not?: InputMaybe<Scalars['BigInt']>;
  _tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  _tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  _tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  _tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  _tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MetadataUpdate_filter>>>;
  or?: InputMaybe<Array<InputMaybe<MetadataUpdate_filter>>>;
};

export type MetadataUpdate_orderBy =
  | 'id'
  | '_tokenId'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  approval?: Maybe<Approval>;
  approvals: Array<Approval>;
  approvalForAll?: Maybe<ApprovalForAll>;
  approvalForAlls: Array<ApprovalForAll>;
  batchMetadataUpdate?: Maybe<BatchMetadataUpdate>;
  batchMetadataUpdates: Array<BatchMetadataUpdate>;
  companyAccountUpdated?: Maybe<CompanyAccountUpdated>;
  companyAccountUpdateds: Array<CompanyAccountUpdated>;
  metadataUpdate?: Maybe<MetadataUpdate>;
  metadataUpdates: Array<MetadataUpdate>;
  registerCreated?: Maybe<RegisterCreated>;
  registerCreateds: Array<RegisterCreated>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  verificationTaskCreated?: Maybe<VerificationTaskCreated>;
  verificationTaskCreateds: Array<VerificationTaskCreated>;
  verificationTaskUpdated?: Maybe<VerificationTaskUpdated>;
  verificationTaskUpdateds: Array<VerificationTaskUpdated>;
  verificationTaskValidated?: Maybe<VerificationTaskValidated>;
  verificationTaskValidateds: Array<VerificationTaskValidated>;
  verifierAccountUpdated?: Maybe<VerifierAccountUpdated>;
  verifierAccountUpdateds: Array<VerifierAccountUpdated>;
  verifierAddedToCompany?: Maybe<VerifierAddedToCompany>;
  verifierAddedToCompanies: Array<VerifierAddedToCompany>;
  verifierCreated?: Maybe<VerifierCreated>;
  verifierCreateds: Array<VerifierCreated>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryapprovalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryapprovalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Approval_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Approval_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryapprovalForAllArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryapprovalForAllsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ApprovalForAll_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ApprovalForAll_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybatchMetadataUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybatchMetadataUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BatchMetadataUpdate_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BatchMetadataUpdate_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycompanyAccountUpdatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycompanyAccountUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CompanyAccountUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CompanyAccountUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymetadataUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymetadataUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MetadataUpdate_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MetadataUpdate_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryregisterCreatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryregisterCreatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RegisterCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RegisterCreated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transfer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryverificationTaskCreatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryverificationTaskCreatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VerificationTaskCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VerificationTaskCreated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryverificationTaskUpdatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryverificationTaskUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VerificationTaskUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VerificationTaskUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryverificationTaskValidatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryverificationTaskValidatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VerificationTaskValidated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VerificationTaskValidated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryverifierAccountUpdatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryverifierAccountUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VerifierAccountUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VerifierAccountUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryverifierAddedToCompanyArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryverifierAddedToCompaniesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VerifierAddedToCompany_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VerifierAddedToCompany_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryverifierCreatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryverifierCreatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VerifierCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VerifierCreated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type RegisterCreated = {
  id: Scalars['Bytes'];
  _addr: Scalars['Bytes'];
  _name: Scalars['String'];
  _addressName: Scalars['String'];
  _siret: Scalars['String'];
  _siteName: Scalars['String'];
  _siteAddressName: Scalars['String'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type RegisterCreated_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  _addr?: InputMaybe<Scalars['Bytes']>;
  _addr_not?: InputMaybe<Scalars['Bytes']>;
  _addr_gt?: InputMaybe<Scalars['Bytes']>;
  _addr_lt?: InputMaybe<Scalars['Bytes']>;
  _addr_gte?: InputMaybe<Scalars['Bytes']>;
  _addr_lte?: InputMaybe<Scalars['Bytes']>;
  _addr_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _addr_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _addr_contains?: InputMaybe<Scalars['Bytes']>;
  _addr_not_contains?: InputMaybe<Scalars['Bytes']>;
  _name?: InputMaybe<Scalars['String']>;
  _name_not?: InputMaybe<Scalars['String']>;
  _name_gt?: InputMaybe<Scalars['String']>;
  _name_lt?: InputMaybe<Scalars['String']>;
  _name_gte?: InputMaybe<Scalars['String']>;
  _name_lte?: InputMaybe<Scalars['String']>;
  _name_in?: InputMaybe<Array<Scalars['String']>>;
  _name_not_in?: InputMaybe<Array<Scalars['String']>>;
  _name_contains?: InputMaybe<Scalars['String']>;
  _name_contains_nocase?: InputMaybe<Scalars['String']>;
  _name_not_contains?: InputMaybe<Scalars['String']>;
  _name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  _name_starts_with?: InputMaybe<Scalars['String']>;
  _name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _name_not_starts_with?: InputMaybe<Scalars['String']>;
  _name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _name_ends_with?: InputMaybe<Scalars['String']>;
  _name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _name_not_ends_with?: InputMaybe<Scalars['String']>;
  _name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _addressName?: InputMaybe<Scalars['String']>;
  _addressName_not?: InputMaybe<Scalars['String']>;
  _addressName_gt?: InputMaybe<Scalars['String']>;
  _addressName_lt?: InputMaybe<Scalars['String']>;
  _addressName_gte?: InputMaybe<Scalars['String']>;
  _addressName_lte?: InputMaybe<Scalars['String']>;
  _addressName_in?: InputMaybe<Array<Scalars['String']>>;
  _addressName_not_in?: InputMaybe<Array<Scalars['String']>>;
  _addressName_contains?: InputMaybe<Scalars['String']>;
  _addressName_contains_nocase?: InputMaybe<Scalars['String']>;
  _addressName_not_contains?: InputMaybe<Scalars['String']>;
  _addressName_not_contains_nocase?: InputMaybe<Scalars['String']>;
  _addressName_starts_with?: InputMaybe<Scalars['String']>;
  _addressName_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _addressName_not_starts_with?: InputMaybe<Scalars['String']>;
  _addressName_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _addressName_ends_with?: InputMaybe<Scalars['String']>;
  _addressName_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _addressName_not_ends_with?: InputMaybe<Scalars['String']>;
  _addressName_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _siret?: InputMaybe<Scalars['String']>;
  _siret_not?: InputMaybe<Scalars['String']>;
  _siret_gt?: InputMaybe<Scalars['String']>;
  _siret_lt?: InputMaybe<Scalars['String']>;
  _siret_gte?: InputMaybe<Scalars['String']>;
  _siret_lte?: InputMaybe<Scalars['String']>;
  _siret_in?: InputMaybe<Array<Scalars['String']>>;
  _siret_not_in?: InputMaybe<Array<Scalars['String']>>;
  _siret_contains?: InputMaybe<Scalars['String']>;
  _siret_contains_nocase?: InputMaybe<Scalars['String']>;
  _siret_not_contains?: InputMaybe<Scalars['String']>;
  _siret_not_contains_nocase?: InputMaybe<Scalars['String']>;
  _siret_starts_with?: InputMaybe<Scalars['String']>;
  _siret_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _siret_not_starts_with?: InputMaybe<Scalars['String']>;
  _siret_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _siret_ends_with?: InputMaybe<Scalars['String']>;
  _siret_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _siret_not_ends_with?: InputMaybe<Scalars['String']>;
  _siret_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _siteName?: InputMaybe<Scalars['String']>;
  _siteName_not?: InputMaybe<Scalars['String']>;
  _siteName_gt?: InputMaybe<Scalars['String']>;
  _siteName_lt?: InputMaybe<Scalars['String']>;
  _siteName_gte?: InputMaybe<Scalars['String']>;
  _siteName_lte?: InputMaybe<Scalars['String']>;
  _siteName_in?: InputMaybe<Array<Scalars['String']>>;
  _siteName_not_in?: InputMaybe<Array<Scalars['String']>>;
  _siteName_contains?: InputMaybe<Scalars['String']>;
  _siteName_contains_nocase?: InputMaybe<Scalars['String']>;
  _siteName_not_contains?: InputMaybe<Scalars['String']>;
  _siteName_not_contains_nocase?: InputMaybe<Scalars['String']>;
  _siteName_starts_with?: InputMaybe<Scalars['String']>;
  _siteName_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _siteName_not_starts_with?: InputMaybe<Scalars['String']>;
  _siteName_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _siteName_ends_with?: InputMaybe<Scalars['String']>;
  _siteName_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _siteName_not_ends_with?: InputMaybe<Scalars['String']>;
  _siteName_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _siteAddressName?: InputMaybe<Scalars['String']>;
  _siteAddressName_not?: InputMaybe<Scalars['String']>;
  _siteAddressName_gt?: InputMaybe<Scalars['String']>;
  _siteAddressName_lt?: InputMaybe<Scalars['String']>;
  _siteAddressName_gte?: InputMaybe<Scalars['String']>;
  _siteAddressName_lte?: InputMaybe<Scalars['String']>;
  _siteAddressName_in?: InputMaybe<Array<Scalars['String']>>;
  _siteAddressName_not_in?: InputMaybe<Array<Scalars['String']>>;
  _siteAddressName_contains?: InputMaybe<Scalars['String']>;
  _siteAddressName_contains_nocase?: InputMaybe<Scalars['String']>;
  _siteAddressName_not_contains?: InputMaybe<Scalars['String']>;
  _siteAddressName_not_contains_nocase?: InputMaybe<Scalars['String']>;
  _siteAddressName_starts_with?: InputMaybe<Scalars['String']>;
  _siteAddressName_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _siteAddressName_not_starts_with?: InputMaybe<Scalars['String']>;
  _siteAddressName_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _siteAddressName_ends_with?: InputMaybe<Scalars['String']>;
  _siteAddressName_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _siteAddressName_not_ends_with?: InputMaybe<Scalars['String']>;
  _siteAddressName_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RegisterCreated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<RegisterCreated_filter>>>;
};

export type RegisterCreated_orderBy =
  | 'id'
  | '_addr'
  | '_name'
  | '_addressName'
  | '_siret'
  | '_siteName'
  | '_siteAddressName'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Subscription = {
  approval?: Maybe<Approval>;
  approvals: Array<Approval>;
  approvalForAll?: Maybe<ApprovalForAll>;
  approvalForAlls: Array<ApprovalForAll>;
  batchMetadataUpdate?: Maybe<BatchMetadataUpdate>;
  batchMetadataUpdates: Array<BatchMetadataUpdate>;
  companyAccountUpdated?: Maybe<CompanyAccountUpdated>;
  companyAccountUpdateds: Array<CompanyAccountUpdated>;
  metadataUpdate?: Maybe<MetadataUpdate>;
  metadataUpdates: Array<MetadataUpdate>;
  registerCreated?: Maybe<RegisterCreated>;
  registerCreateds: Array<RegisterCreated>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  verificationTaskCreated?: Maybe<VerificationTaskCreated>;
  verificationTaskCreateds: Array<VerificationTaskCreated>;
  verificationTaskUpdated?: Maybe<VerificationTaskUpdated>;
  verificationTaskUpdateds: Array<VerificationTaskUpdated>;
  verificationTaskValidated?: Maybe<VerificationTaskValidated>;
  verificationTaskValidateds: Array<VerificationTaskValidated>;
  verifierAccountUpdated?: Maybe<VerifierAccountUpdated>;
  verifierAccountUpdateds: Array<VerifierAccountUpdated>;
  verifierAddedToCompany?: Maybe<VerifierAddedToCompany>;
  verifierAddedToCompanies: Array<VerifierAddedToCompany>;
  verifierCreated?: Maybe<VerifierCreated>;
  verifierCreateds: Array<VerifierCreated>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionapprovalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionapprovalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Approval_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Approval_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionapprovalForAllArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionapprovalForAllsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ApprovalForAll_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ApprovalForAll_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbatchMetadataUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbatchMetadataUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BatchMetadataUpdate_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BatchMetadataUpdate_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncompanyAccountUpdatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncompanyAccountUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CompanyAccountUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CompanyAccountUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmetadataUpdateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmetadataUpdatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MetadataUpdate_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MetadataUpdate_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionregisterCreatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionregisterCreatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RegisterCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RegisterCreated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transfer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionverificationTaskCreatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionverificationTaskCreatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VerificationTaskCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VerificationTaskCreated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionverificationTaskUpdatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionverificationTaskUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VerificationTaskUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VerificationTaskUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionverificationTaskValidatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionverificationTaskValidatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VerificationTaskValidated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VerificationTaskValidated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionverifierAccountUpdatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionverifierAccountUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VerifierAccountUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VerifierAccountUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionverifierAddedToCompanyArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionverifierAddedToCompaniesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VerifierAddedToCompany_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VerifierAddedToCompany_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionverifierCreatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionverifierCreatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VerifierCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VerifierCreated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Transfer = {
  id: Scalars['Bytes'];
  from: Scalars['Bytes'];
  to: Scalars['Bytes'];
  tokenId: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type Transfer_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  from?: InputMaybe<Scalars['Bytes']>;
  from_not?: InputMaybe<Scalars['Bytes']>;
  from_gt?: InputMaybe<Scalars['Bytes']>;
  from_lt?: InputMaybe<Scalars['Bytes']>;
  from_gte?: InputMaybe<Scalars['Bytes']>;
  from_lte?: InputMaybe<Scalars['Bytes']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_contains?: InputMaybe<Scalars['Bytes']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_gt?: InputMaybe<Scalars['Bytes']>;
  to_lt?: InputMaybe<Scalars['Bytes']>;
  to_gte?: InputMaybe<Scalars['Bytes']>;
  to_lte?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Transfer_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Transfer_filter>>>;
};

export type Transfer_orderBy =
  | 'id'
  | 'from'
  | 'to'
  | 'tokenId'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type VerificationTaskCreated = {
  id: Scalars['Bytes'];
  _company: Scalars['Bytes'];
  _verifier: Scalars['Bytes'];
  _registerId: Scalars['BigInt'];
  _securityType: Scalars['String'];
  _taskId: Scalars['BigInt'];
  _taskStatus: Scalars['Int'];
  _siteName: Scalars['String'];
  _timestamp: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type VerificationTaskCreated_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  _company?: InputMaybe<Scalars['Bytes']>;
  _company_not?: InputMaybe<Scalars['Bytes']>;
  _company_gt?: InputMaybe<Scalars['Bytes']>;
  _company_lt?: InputMaybe<Scalars['Bytes']>;
  _company_gte?: InputMaybe<Scalars['Bytes']>;
  _company_lte?: InputMaybe<Scalars['Bytes']>;
  _company_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _company_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _company_contains?: InputMaybe<Scalars['Bytes']>;
  _company_not_contains?: InputMaybe<Scalars['Bytes']>;
  _verifier?: InputMaybe<Scalars['Bytes']>;
  _verifier_not?: InputMaybe<Scalars['Bytes']>;
  _verifier_gt?: InputMaybe<Scalars['Bytes']>;
  _verifier_lt?: InputMaybe<Scalars['Bytes']>;
  _verifier_gte?: InputMaybe<Scalars['Bytes']>;
  _verifier_lte?: InputMaybe<Scalars['Bytes']>;
  _verifier_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _verifier_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _verifier_contains?: InputMaybe<Scalars['Bytes']>;
  _verifier_not_contains?: InputMaybe<Scalars['Bytes']>;
  _registerId?: InputMaybe<Scalars['BigInt']>;
  _registerId_not?: InputMaybe<Scalars['BigInt']>;
  _registerId_gt?: InputMaybe<Scalars['BigInt']>;
  _registerId_lt?: InputMaybe<Scalars['BigInt']>;
  _registerId_gte?: InputMaybe<Scalars['BigInt']>;
  _registerId_lte?: InputMaybe<Scalars['BigInt']>;
  _registerId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _registerId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _securityType?: InputMaybe<Scalars['String']>;
  _securityType_not?: InputMaybe<Scalars['String']>;
  _securityType_gt?: InputMaybe<Scalars['String']>;
  _securityType_lt?: InputMaybe<Scalars['String']>;
  _securityType_gte?: InputMaybe<Scalars['String']>;
  _securityType_lte?: InputMaybe<Scalars['String']>;
  _securityType_in?: InputMaybe<Array<Scalars['String']>>;
  _securityType_not_in?: InputMaybe<Array<Scalars['String']>>;
  _securityType_contains?: InputMaybe<Scalars['String']>;
  _securityType_contains_nocase?: InputMaybe<Scalars['String']>;
  _securityType_not_contains?: InputMaybe<Scalars['String']>;
  _securityType_not_contains_nocase?: InputMaybe<Scalars['String']>;
  _securityType_starts_with?: InputMaybe<Scalars['String']>;
  _securityType_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _securityType_not_starts_with?: InputMaybe<Scalars['String']>;
  _securityType_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _securityType_ends_with?: InputMaybe<Scalars['String']>;
  _securityType_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _securityType_not_ends_with?: InputMaybe<Scalars['String']>;
  _securityType_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _taskId?: InputMaybe<Scalars['BigInt']>;
  _taskId_not?: InputMaybe<Scalars['BigInt']>;
  _taskId_gt?: InputMaybe<Scalars['BigInt']>;
  _taskId_lt?: InputMaybe<Scalars['BigInt']>;
  _taskId_gte?: InputMaybe<Scalars['BigInt']>;
  _taskId_lte?: InputMaybe<Scalars['BigInt']>;
  _taskId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _taskId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _taskStatus?: InputMaybe<Scalars['Int']>;
  _taskStatus_not?: InputMaybe<Scalars['Int']>;
  _taskStatus_gt?: InputMaybe<Scalars['Int']>;
  _taskStatus_lt?: InputMaybe<Scalars['Int']>;
  _taskStatus_gte?: InputMaybe<Scalars['Int']>;
  _taskStatus_lte?: InputMaybe<Scalars['Int']>;
  _taskStatus_in?: InputMaybe<Array<Scalars['Int']>>;
  _taskStatus_not_in?: InputMaybe<Array<Scalars['Int']>>;
  _siteName?: InputMaybe<Scalars['String']>;
  _siteName_not?: InputMaybe<Scalars['String']>;
  _siteName_gt?: InputMaybe<Scalars['String']>;
  _siteName_lt?: InputMaybe<Scalars['String']>;
  _siteName_gte?: InputMaybe<Scalars['String']>;
  _siteName_lte?: InputMaybe<Scalars['String']>;
  _siteName_in?: InputMaybe<Array<Scalars['String']>>;
  _siteName_not_in?: InputMaybe<Array<Scalars['String']>>;
  _siteName_contains?: InputMaybe<Scalars['String']>;
  _siteName_contains_nocase?: InputMaybe<Scalars['String']>;
  _siteName_not_contains?: InputMaybe<Scalars['String']>;
  _siteName_not_contains_nocase?: InputMaybe<Scalars['String']>;
  _siteName_starts_with?: InputMaybe<Scalars['String']>;
  _siteName_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _siteName_not_starts_with?: InputMaybe<Scalars['String']>;
  _siteName_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _siteName_ends_with?: InputMaybe<Scalars['String']>;
  _siteName_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _siteName_not_ends_with?: InputMaybe<Scalars['String']>;
  _siteName_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _timestamp?: InputMaybe<Scalars['BigInt']>;
  _timestamp_not?: InputMaybe<Scalars['BigInt']>;
  _timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  _timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  _timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  _timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  _timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VerificationTaskCreated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<VerificationTaskCreated_filter>>>;
};

export type VerificationTaskCreated_orderBy =
  | 'id'
  | '_company'
  | '_verifier'
  | '_registerId'
  | '_securityType'
  | '_taskId'
  | '_taskStatus'
  | '_siteName'
  | '_timestamp'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type VerificationTaskUpdated = {
  id: Scalars['Bytes'];
  _company: Scalars['Bytes'];
  _taskId: Scalars['BigInt'];
  _taskStatus: Scalars['Int'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type VerificationTaskUpdated_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  _company?: InputMaybe<Scalars['Bytes']>;
  _company_not?: InputMaybe<Scalars['Bytes']>;
  _company_gt?: InputMaybe<Scalars['Bytes']>;
  _company_lt?: InputMaybe<Scalars['Bytes']>;
  _company_gte?: InputMaybe<Scalars['Bytes']>;
  _company_lte?: InputMaybe<Scalars['Bytes']>;
  _company_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _company_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _company_contains?: InputMaybe<Scalars['Bytes']>;
  _company_not_contains?: InputMaybe<Scalars['Bytes']>;
  _taskId?: InputMaybe<Scalars['BigInt']>;
  _taskId_not?: InputMaybe<Scalars['BigInt']>;
  _taskId_gt?: InputMaybe<Scalars['BigInt']>;
  _taskId_lt?: InputMaybe<Scalars['BigInt']>;
  _taskId_gte?: InputMaybe<Scalars['BigInt']>;
  _taskId_lte?: InputMaybe<Scalars['BigInt']>;
  _taskId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _taskId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _taskStatus?: InputMaybe<Scalars['Int']>;
  _taskStatus_not?: InputMaybe<Scalars['Int']>;
  _taskStatus_gt?: InputMaybe<Scalars['Int']>;
  _taskStatus_lt?: InputMaybe<Scalars['Int']>;
  _taskStatus_gte?: InputMaybe<Scalars['Int']>;
  _taskStatus_lte?: InputMaybe<Scalars['Int']>;
  _taskStatus_in?: InputMaybe<Array<Scalars['Int']>>;
  _taskStatus_not_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VerificationTaskUpdated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<VerificationTaskUpdated_filter>>>;
};

export type VerificationTaskUpdated_orderBy =
  | 'id'
  | '_company'
  | '_taskId'
  | '_taskStatus'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type VerificationTaskValidated = {
  id: Scalars['Bytes'];
  _verifier: Scalars['Bytes'];
  _taskId: Scalars['BigInt'];
  _taskStatus: Scalars['Int'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type VerificationTaskValidated_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  _verifier?: InputMaybe<Scalars['Bytes']>;
  _verifier_not?: InputMaybe<Scalars['Bytes']>;
  _verifier_gt?: InputMaybe<Scalars['Bytes']>;
  _verifier_lt?: InputMaybe<Scalars['Bytes']>;
  _verifier_gte?: InputMaybe<Scalars['Bytes']>;
  _verifier_lte?: InputMaybe<Scalars['Bytes']>;
  _verifier_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _verifier_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _verifier_contains?: InputMaybe<Scalars['Bytes']>;
  _verifier_not_contains?: InputMaybe<Scalars['Bytes']>;
  _taskId?: InputMaybe<Scalars['BigInt']>;
  _taskId_not?: InputMaybe<Scalars['BigInt']>;
  _taskId_gt?: InputMaybe<Scalars['BigInt']>;
  _taskId_lt?: InputMaybe<Scalars['BigInt']>;
  _taskId_gte?: InputMaybe<Scalars['BigInt']>;
  _taskId_lte?: InputMaybe<Scalars['BigInt']>;
  _taskId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _taskId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _taskStatus?: InputMaybe<Scalars['Int']>;
  _taskStatus_not?: InputMaybe<Scalars['Int']>;
  _taskStatus_gt?: InputMaybe<Scalars['Int']>;
  _taskStatus_lt?: InputMaybe<Scalars['Int']>;
  _taskStatus_gte?: InputMaybe<Scalars['Int']>;
  _taskStatus_lte?: InputMaybe<Scalars['Int']>;
  _taskStatus_in?: InputMaybe<Array<Scalars['Int']>>;
  _taskStatus_not_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VerificationTaskValidated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<VerificationTaskValidated_filter>>>;
};

export type VerificationTaskValidated_orderBy =
  | 'id'
  | '_verifier'
  | '_taskId'
  | '_taskStatus'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type VerifierAccountUpdated = {
  id: Scalars['Bytes'];
  _verifier: Scalars['Bytes'];
  _account: Scalars['Bytes'];
  _name: Scalars['String'];
  _firstName: Scalars['String'];
  _action: Scalars['String'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type VerifierAccountUpdated_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  _verifier?: InputMaybe<Scalars['Bytes']>;
  _verifier_not?: InputMaybe<Scalars['Bytes']>;
  _verifier_gt?: InputMaybe<Scalars['Bytes']>;
  _verifier_lt?: InputMaybe<Scalars['Bytes']>;
  _verifier_gte?: InputMaybe<Scalars['Bytes']>;
  _verifier_lte?: InputMaybe<Scalars['Bytes']>;
  _verifier_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _verifier_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _verifier_contains?: InputMaybe<Scalars['Bytes']>;
  _verifier_not_contains?: InputMaybe<Scalars['Bytes']>;
  _account?: InputMaybe<Scalars['Bytes']>;
  _account_not?: InputMaybe<Scalars['Bytes']>;
  _account_gt?: InputMaybe<Scalars['Bytes']>;
  _account_lt?: InputMaybe<Scalars['Bytes']>;
  _account_gte?: InputMaybe<Scalars['Bytes']>;
  _account_lte?: InputMaybe<Scalars['Bytes']>;
  _account_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _account_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _account_contains?: InputMaybe<Scalars['Bytes']>;
  _account_not_contains?: InputMaybe<Scalars['Bytes']>;
  _name?: InputMaybe<Scalars['String']>;
  _name_not?: InputMaybe<Scalars['String']>;
  _name_gt?: InputMaybe<Scalars['String']>;
  _name_lt?: InputMaybe<Scalars['String']>;
  _name_gte?: InputMaybe<Scalars['String']>;
  _name_lte?: InputMaybe<Scalars['String']>;
  _name_in?: InputMaybe<Array<Scalars['String']>>;
  _name_not_in?: InputMaybe<Array<Scalars['String']>>;
  _name_contains?: InputMaybe<Scalars['String']>;
  _name_contains_nocase?: InputMaybe<Scalars['String']>;
  _name_not_contains?: InputMaybe<Scalars['String']>;
  _name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  _name_starts_with?: InputMaybe<Scalars['String']>;
  _name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _name_not_starts_with?: InputMaybe<Scalars['String']>;
  _name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _name_ends_with?: InputMaybe<Scalars['String']>;
  _name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _name_not_ends_with?: InputMaybe<Scalars['String']>;
  _name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _firstName?: InputMaybe<Scalars['String']>;
  _firstName_not?: InputMaybe<Scalars['String']>;
  _firstName_gt?: InputMaybe<Scalars['String']>;
  _firstName_lt?: InputMaybe<Scalars['String']>;
  _firstName_gte?: InputMaybe<Scalars['String']>;
  _firstName_lte?: InputMaybe<Scalars['String']>;
  _firstName_in?: InputMaybe<Array<Scalars['String']>>;
  _firstName_not_in?: InputMaybe<Array<Scalars['String']>>;
  _firstName_contains?: InputMaybe<Scalars['String']>;
  _firstName_contains_nocase?: InputMaybe<Scalars['String']>;
  _firstName_not_contains?: InputMaybe<Scalars['String']>;
  _firstName_not_contains_nocase?: InputMaybe<Scalars['String']>;
  _firstName_starts_with?: InputMaybe<Scalars['String']>;
  _firstName_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _firstName_not_starts_with?: InputMaybe<Scalars['String']>;
  _firstName_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _firstName_ends_with?: InputMaybe<Scalars['String']>;
  _firstName_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _firstName_not_ends_with?: InputMaybe<Scalars['String']>;
  _firstName_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _action?: InputMaybe<Scalars['String']>;
  _action_not?: InputMaybe<Scalars['String']>;
  _action_gt?: InputMaybe<Scalars['String']>;
  _action_lt?: InputMaybe<Scalars['String']>;
  _action_gte?: InputMaybe<Scalars['String']>;
  _action_lte?: InputMaybe<Scalars['String']>;
  _action_in?: InputMaybe<Array<Scalars['String']>>;
  _action_not_in?: InputMaybe<Array<Scalars['String']>>;
  _action_contains?: InputMaybe<Scalars['String']>;
  _action_contains_nocase?: InputMaybe<Scalars['String']>;
  _action_not_contains?: InputMaybe<Scalars['String']>;
  _action_not_contains_nocase?: InputMaybe<Scalars['String']>;
  _action_starts_with?: InputMaybe<Scalars['String']>;
  _action_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _action_not_starts_with?: InputMaybe<Scalars['String']>;
  _action_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _action_ends_with?: InputMaybe<Scalars['String']>;
  _action_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _action_not_ends_with?: InputMaybe<Scalars['String']>;
  _action_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VerifierAccountUpdated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<VerifierAccountUpdated_filter>>>;
};

export type VerifierAccountUpdated_orderBy =
  | 'id'
  | '_verifier'
  | '_account'
  | '_name'
  | '_firstName'
  | '_action'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type VerifierAddedToCompany = {
  id: Scalars['Bytes'];
  _company: Scalars['Bytes'];
  _verifier: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type VerifierAddedToCompany_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  _company?: InputMaybe<Scalars['Bytes']>;
  _company_not?: InputMaybe<Scalars['Bytes']>;
  _company_gt?: InputMaybe<Scalars['Bytes']>;
  _company_lt?: InputMaybe<Scalars['Bytes']>;
  _company_gte?: InputMaybe<Scalars['Bytes']>;
  _company_lte?: InputMaybe<Scalars['Bytes']>;
  _company_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _company_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _company_contains?: InputMaybe<Scalars['Bytes']>;
  _company_not_contains?: InputMaybe<Scalars['Bytes']>;
  _verifier?: InputMaybe<Scalars['Bytes']>;
  _verifier_not?: InputMaybe<Scalars['Bytes']>;
  _verifier_gt?: InputMaybe<Scalars['Bytes']>;
  _verifier_lt?: InputMaybe<Scalars['Bytes']>;
  _verifier_gte?: InputMaybe<Scalars['Bytes']>;
  _verifier_lte?: InputMaybe<Scalars['Bytes']>;
  _verifier_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _verifier_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _verifier_contains?: InputMaybe<Scalars['Bytes']>;
  _verifier_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VerifierAddedToCompany_filter>>>;
  or?: InputMaybe<Array<InputMaybe<VerifierAddedToCompany_filter>>>;
};

export type VerifierAddedToCompany_orderBy =
  | 'id'
  | '_company'
  | '_verifier'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type VerifierCreated = {
  id: Scalars['Bytes'];
  _verifier: Scalars['Bytes'];
  _name: Scalars['String'];
  _addressName: Scalars['String'];
  _siret: Scalars['String'];
  _approvalNumber: Scalars['String'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type VerifierCreated_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  _verifier?: InputMaybe<Scalars['Bytes']>;
  _verifier_not?: InputMaybe<Scalars['Bytes']>;
  _verifier_gt?: InputMaybe<Scalars['Bytes']>;
  _verifier_lt?: InputMaybe<Scalars['Bytes']>;
  _verifier_gte?: InputMaybe<Scalars['Bytes']>;
  _verifier_lte?: InputMaybe<Scalars['Bytes']>;
  _verifier_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _verifier_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _verifier_contains?: InputMaybe<Scalars['Bytes']>;
  _verifier_not_contains?: InputMaybe<Scalars['Bytes']>;
  _name?: InputMaybe<Scalars['String']>;
  _name_not?: InputMaybe<Scalars['String']>;
  _name_gt?: InputMaybe<Scalars['String']>;
  _name_lt?: InputMaybe<Scalars['String']>;
  _name_gte?: InputMaybe<Scalars['String']>;
  _name_lte?: InputMaybe<Scalars['String']>;
  _name_in?: InputMaybe<Array<Scalars['String']>>;
  _name_not_in?: InputMaybe<Array<Scalars['String']>>;
  _name_contains?: InputMaybe<Scalars['String']>;
  _name_contains_nocase?: InputMaybe<Scalars['String']>;
  _name_not_contains?: InputMaybe<Scalars['String']>;
  _name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  _name_starts_with?: InputMaybe<Scalars['String']>;
  _name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _name_not_starts_with?: InputMaybe<Scalars['String']>;
  _name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _name_ends_with?: InputMaybe<Scalars['String']>;
  _name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _name_not_ends_with?: InputMaybe<Scalars['String']>;
  _name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _addressName?: InputMaybe<Scalars['String']>;
  _addressName_not?: InputMaybe<Scalars['String']>;
  _addressName_gt?: InputMaybe<Scalars['String']>;
  _addressName_lt?: InputMaybe<Scalars['String']>;
  _addressName_gte?: InputMaybe<Scalars['String']>;
  _addressName_lte?: InputMaybe<Scalars['String']>;
  _addressName_in?: InputMaybe<Array<Scalars['String']>>;
  _addressName_not_in?: InputMaybe<Array<Scalars['String']>>;
  _addressName_contains?: InputMaybe<Scalars['String']>;
  _addressName_contains_nocase?: InputMaybe<Scalars['String']>;
  _addressName_not_contains?: InputMaybe<Scalars['String']>;
  _addressName_not_contains_nocase?: InputMaybe<Scalars['String']>;
  _addressName_starts_with?: InputMaybe<Scalars['String']>;
  _addressName_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _addressName_not_starts_with?: InputMaybe<Scalars['String']>;
  _addressName_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _addressName_ends_with?: InputMaybe<Scalars['String']>;
  _addressName_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _addressName_not_ends_with?: InputMaybe<Scalars['String']>;
  _addressName_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _siret?: InputMaybe<Scalars['String']>;
  _siret_not?: InputMaybe<Scalars['String']>;
  _siret_gt?: InputMaybe<Scalars['String']>;
  _siret_lt?: InputMaybe<Scalars['String']>;
  _siret_gte?: InputMaybe<Scalars['String']>;
  _siret_lte?: InputMaybe<Scalars['String']>;
  _siret_in?: InputMaybe<Array<Scalars['String']>>;
  _siret_not_in?: InputMaybe<Array<Scalars['String']>>;
  _siret_contains?: InputMaybe<Scalars['String']>;
  _siret_contains_nocase?: InputMaybe<Scalars['String']>;
  _siret_not_contains?: InputMaybe<Scalars['String']>;
  _siret_not_contains_nocase?: InputMaybe<Scalars['String']>;
  _siret_starts_with?: InputMaybe<Scalars['String']>;
  _siret_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _siret_not_starts_with?: InputMaybe<Scalars['String']>;
  _siret_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _siret_ends_with?: InputMaybe<Scalars['String']>;
  _siret_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _siret_not_ends_with?: InputMaybe<Scalars['String']>;
  _siret_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _approvalNumber?: InputMaybe<Scalars['String']>;
  _approvalNumber_not?: InputMaybe<Scalars['String']>;
  _approvalNumber_gt?: InputMaybe<Scalars['String']>;
  _approvalNumber_lt?: InputMaybe<Scalars['String']>;
  _approvalNumber_gte?: InputMaybe<Scalars['String']>;
  _approvalNumber_lte?: InputMaybe<Scalars['String']>;
  _approvalNumber_in?: InputMaybe<Array<Scalars['String']>>;
  _approvalNumber_not_in?: InputMaybe<Array<Scalars['String']>>;
  _approvalNumber_contains?: InputMaybe<Scalars['String']>;
  _approvalNumber_contains_nocase?: InputMaybe<Scalars['String']>;
  _approvalNumber_not_contains?: InputMaybe<Scalars['String']>;
  _approvalNumber_not_contains_nocase?: InputMaybe<Scalars['String']>;
  _approvalNumber_starts_with?: InputMaybe<Scalars['String']>;
  _approvalNumber_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _approvalNumber_not_starts_with?: InputMaybe<Scalars['String']>;
  _approvalNumber_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  _approvalNumber_ends_with?: InputMaybe<Scalars['String']>;
  _approvalNumber_ends_with_nocase?: InputMaybe<Scalars['String']>;
  _approvalNumber_not_ends_with?: InputMaybe<Scalars['String']>;
  _approvalNumber_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VerifierCreated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<VerifierCreated_filter>>>;
};

export type VerifierCreated_orderBy =
  | 'id'
  | '_verifier'
  | '_name'
  | '_addressName'
  | '_siret'
  | '_approvalNumber'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Approval: ResolverTypeWrapper<Approval>;
  ApprovalForAll: ResolverTypeWrapper<ApprovalForAll>;
  ApprovalForAll_filter: ApprovalForAll_filter;
  ApprovalForAll_orderBy: ApprovalForAll_orderBy;
  Approval_filter: Approval_filter;
  Approval_orderBy: Approval_orderBy;
  BatchMetadataUpdate: ResolverTypeWrapper<BatchMetadataUpdate>;
  BatchMetadataUpdate_filter: BatchMetadataUpdate_filter;
  BatchMetadataUpdate_orderBy: BatchMetadataUpdate_orderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  CompanyAccountUpdated: ResolverTypeWrapper<CompanyAccountUpdated>;
  CompanyAccountUpdated_filter: CompanyAccountUpdated_filter;
  CompanyAccountUpdated_orderBy: CompanyAccountUpdated_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']>;
  MetadataUpdate: ResolverTypeWrapper<MetadataUpdate>;
  MetadataUpdate_filter: MetadataUpdate_filter;
  MetadataUpdate_orderBy: MetadataUpdate_orderBy;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  RegisterCreated: ResolverTypeWrapper<RegisterCreated>;
  RegisterCreated_filter: RegisterCreated_filter;
  RegisterCreated_orderBy: RegisterCreated_orderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Transfer: ResolverTypeWrapper<Transfer>;
  Transfer_filter: Transfer_filter;
  Transfer_orderBy: Transfer_orderBy;
  VerificationTaskCreated: ResolverTypeWrapper<VerificationTaskCreated>;
  VerificationTaskCreated_filter: VerificationTaskCreated_filter;
  VerificationTaskCreated_orderBy: VerificationTaskCreated_orderBy;
  VerificationTaskUpdated: ResolverTypeWrapper<VerificationTaskUpdated>;
  VerificationTaskUpdated_filter: VerificationTaskUpdated_filter;
  VerificationTaskUpdated_orderBy: VerificationTaskUpdated_orderBy;
  VerificationTaskValidated: ResolverTypeWrapper<VerificationTaskValidated>;
  VerificationTaskValidated_filter: VerificationTaskValidated_filter;
  VerificationTaskValidated_orderBy: VerificationTaskValidated_orderBy;
  VerifierAccountUpdated: ResolverTypeWrapper<VerifierAccountUpdated>;
  VerifierAccountUpdated_filter: VerifierAccountUpdated_filter;
  VerifierAccountUpdated_orderBy: VerifierAccountUpdated_orderBy;
  VerifierAddedToCompany: ResolverTypeWrapper<VerifierAddedToCompany>;
  VerifierAddedToCompany_filter: VerifierAddedToCompany_filter;
  VerifierAddedToCompany_orderBy: VerifierAddedToCompany_orderBy;
  VerifierCreated: ResolverTypeWrapper<VerifierCreated>;
  VerifierCreated_filter: VerifierCreated_filter;
  VerifierCreated_orderBy: VerifierCreated_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Approval: Approval;
  ApprovalForAll: ApprovalForAll;
  ApprovalForAll_filter: ApprovalForAll_filter;
  Approval_filter: Approval_filter;
  BatchMetadataUpdate: BatchMetadataUpdate;
  BatchMetadataUpdate_filter: BatchMetadataUpdate_filter;
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  CompanyAccountUpdated: CompanyAccountUpdated;
  CompanyAccountUpdated_filter: CompanyAccountUpdated_filter;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Int8: Scalars['Int8'];
  MetadataUpdate: MetadataUpdate;
  MetadataUpdate_filter: MetadataUpdate_filter;
  Query: {};
  RegisterCreated: RegisterCreated;
  RegisterCreated_filter: RegisterCreated_filter;
  String: Scalars['String'];
  Subscription: {};
  Transfer: Transfer;
  Transfer_filter: Transfer_filter;
  VerificationTaskCreated: VerificationTaskCreated;
  VerificationTaskCreated_filter: VerificationTaskCreated_filter;
  VerificationTaskUpdated: VerificationTaskUpdated;
  VerificationTaskUpdated_filter: VerificationTaskUpdated_filter;
  VerificationTaskValidated: VerificationTaskValidated;
  VerificationTaskValidated_filter: VerificationTaskValidated_filter;
  VerifierAccountUpdated: VerifierAccountUpdated;
  VerifierAccountUpdated_filter: VerifierAccountUpdated_filter;
  VerifierAddedToCompany: VerifierAddedToCompany;
  VerifierAddedToCompany_filter: VerifierAddedToCompany_filter;
  VerifierCreated: VerifierCreated;
  VerifierCreated_filter: VerifierCreated_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ApprovalResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Approval'] = ResolversParentTypes['Approval']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  approved?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ApprovalForAllResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ApprovalForAll'] = ResolversParentTypes['ApprovalForAll']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  operator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  approved?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BatchMetadataUpdateResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BatchMetadataUpdate'] = ResolversParentTypes['BatchMetadataUpdate']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _fromTokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  _toTokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type CompanyAccountUpdatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['CompanyAccountUpdated'] = ResolversParentTypes['CompanyAccountUpdated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _company?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _account?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _action?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type MetadataUpdateResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MetadataUpdate'] = ResolversParentTypes['MetadataUpdate']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  approval?: Resolver<Maybe<ResolversTypes['Approval']>, ParentType, ContextType, RequireFields<QueryapprovalArgs, 'id' | 'subgraphError'>>;
  approvals?: Resolver<Array<ResolversTypes['Approval']>, ParentType, ContextType, RequireFields<QueryapprovalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  approvalForAll?: Resolver<Maybe<ResolversTypes['ApprovalForAll']>, ParentType, ContextType, RequireFields<QueryapprovalForAllArgs, 'id' | 'subgraphError'>>;
  approvalForAlls?: Resolver<Array<ResolversTypes['ApprovalForAll']>, ParentType, ContextType, RequireFields<QueryapprovalForAllsArgs, 'skip' | 'first' | 'subgraphError'>>;
  batchMetadataUpdate?: Resolver<Maybe<ResolversTypes['BatchMetadataUpdate']>, ParentType, ContextType, RequireFields<QuerybatchMetadataUpdateArgs, 'id' | 'subgraphError'>>;
  batchMetadataUpdates?: Resolver<Array<ResolversTypes['BatchMetadataUpdate']>, ParentType, ContextType, RequireFields<QuerybatchMetadataUpdatesArgs, 'skip' | 'first' | 'subgraphError'>>;
  companyAccountUpdated?: Resolver<Maybe<ResolversTypes['CompanyAccountUpdated']>, ParentType, ContextType, RequireFields<QuerycompanyAccountUpdatedArgs, 'id' | 'subgraphError'>>;
  companyAccountUpdateds?: Resolver<Array<ResolversTypes['CompanyAccountUpdated']>, ParentType, ContextType, RequireFields<QuerycompanyAccountUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  metadataUpdate?: Resolver<Maybe<ResolversTypes['MetadataUpdate']>, ParentType, ContextType, RequireFields<QuerymetadataUpdateArgs, 'id' | 'subgraphError'>>;
  metadataUpdates?: Resolver<Array<ResolversTypes['MetadataUpdate']>, ParentType, ContextType, RequireFields<QuerymetadataUpdatesArgs, 'skip' | 'first' | 'subgraphError'>>;
  registerCreated?: Resolver<Maybe<ResolversTypes['RegisterCreated']>, ParentType, ContextType, RequireFields<QueryregisterCreatedArgs, 'id' | 'subgraphError'>>;
  registerCreateds?: Resolver<Array<ResolversTypes['RegisterCreated']>, ParentType, ContextType, RequireFields<QueryregisterCreatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transfer?: Resolver<Maybe<ResolversTypes['Transfer']>, ParentType, ContextType, RequireFields<QuerytransferArgs, 'id' | 'subgraphError'>>;
  transfers?: Resolver<Array<ResolversTypes['Transfer']>, ParentType, ContextType, RequireFields<QuerytransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  verificationTaskCreated?: Resolver<Maybe<ResolversTypes['VerificationTaskCreated']>, ParentType, ContextType, RequireFields<QueryverificationTaskCreatedArgs, 'id' | 'subgraphError'>>;
  verificationTaskCreateds?: Resolver<Array<ResolversTypes['VerificationTaskCreated']>, ParentType, ContextType, RequireFields<QueryverificationTaskCreatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  verificationTaskUpdated?: Resolver<Maybe<ResolversTypes['VerificationTaskUpdated']>, ParentType, ContextType, RequireFields<QueryverificationTaskUpdatedArgs, 'id' | 'subgraphError'>>;
  verificationTaskUpdateds?: Resolver<Array<ResolversTypes['VerificationTaskUpdated']>, ParentType, ContextType, RequireFields<QueryverificationTaskUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  verificationTaskValidated?: Resolver<Maybe<ResolversTypes['VerificationTaskValidated']>, ParentType, ContextType, RequireFields<QueryverificationTaskValidatedArgs, 'id' | 'subgraphError'>>;
  verificationTaskValidateds?: Resolver<Array<ResolversTypes['VerificationTaskValidated']>, ParentType, ContextType, RequireFields<QueryverificationTaskValidatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  verifierAccountUpdated?: Resolver<Maybe<ResolversTypes['VerifierAccountUpdated']>, ParentType, ContextType, RequireFields<QueryverifierAccountUpdatedArgs, 'id' | 'subgraphError'>>;
  verifierAccountUpdateds?: Resolver<Array<ResolversTypes['VerifierAccountUpdated']>, ParentType, ContextType, RequireFields<QueryverifierAccountUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  verifierAddedToCompany?: Resolver<Maybe<ResolversTypes['VerifierAddedToCompany']>, ParentType, ContextType, RequireFields<QueryverifierAddedToCompanyArgs, 'id' | 'subgraphError'>>;
  verifierAddedToCompanies?: Resolver<Array<ResolversTypes['VerifierAddedToCompany']>, ParentType, ContextType, RequireFields<QueryverifierAddedToCompaniesArgs, 'skip' | 'first' | 'subgraphError'>>;
  verifierCreated?: Resolver<Maybe<ResolversTypes['VerifierCreated']>, ParentType, ContextType, RequireFields<QueryverifierCreatedArgs, 'id' | 'subgraphError'>>;
  verifierCreateds?: Resolver<Array<ResolversTypes['VerifierCreated']>, ParentType, ContextType, RequireFields<QueryverifierCreatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type RegisterCreatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RegisterCreated'] = ResolversParentTypes['RegisterCreated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _addr?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _addressName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _siret?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _siteName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _siteAddressName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  approval?: SubscriptionResolver<Maybe<ResolversTypes['Approval']>, "approval", ParentType, ContextType, RequireFields<SubscriptionapprovalArgs, 'id' | 'subgraphError'>>;
  approvals?: SubscriptionResolver<Array<ResolversTypes['Approval']>, "approvals", ParentType, ContextType, RequireFields<SubscriptionapprovalsArgs, 'skip' | 'first' | 'subgraphError'>>;
  approvalForAll?: SubscriptionResolver<Maybe<ResolversTypes['ApprovalForAll']>, "approvalForAll", ParentType, ContextType, RequireFields<SubscriptionapprovalForAllArgs, 'id' | 'subgraphError'>>;
  approvalForAlls?: SubscriptionResolver<Array<ResolversTypes['ApprovalForAll']>, "approvalForAlls", ParentType, ContextType, RequireFields<SubscriptionapprovalForAllsArgs, 'skip' | 'first' | 'subgraphError'>>;
  batchMetadataUpdate?: SubscriptionResolver<Maybe<ResolversTypes['BatchMetadataUpdate']>, "batchMetadataUpdate", ParentType, ContextType, RequireFields<SubscriptionbatchMetadataUpdateArgs, 'id' | 'subgraphError'>>;
  batchMetadataUpdates?: SubscriptionResolver<Array<ResolversTypes['BatchMetadataUpdate']>, "batchMetadataUpdates", ParentType, ContextType, RequireFields<SubscriptionbatchMetadataUpdatesArgs, 'skip' | 'first' | 'subgraphError'>>;
  companyAccountUpdated?: SubscriptionResolver<Maybe<ResolversTypes['CompanyAccountUpdated']>, "companyAccountUpdated", ParentType, ContextType, RequireFields<SubscriptioncompanyAccountUpdatedArgs, 'id' | 'subgraphError'>>;
  companyAccountUpdateds?: SubscriptionResolver<Array<ResolversTypes['CompanyAccountUpdated']>, "companyAccountUpdateds", ParentType, ContextType, RequireFields<SubscriptioncompanyAccountUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  metadataUpdate?: SubscriptionResolver<Maybe<ResolversTypes['MetadataUpdate']>, "metadataUpdate", ParentType, ContextType, RequireFields<SubscriptionmetadataUpdateArgs, 'id' | 'subgraphError'>>;
  metadataUpdates?: SubscriptionResolver<Array<ResolversTypes['MetadataUpdate']>, "metadataUpdates", ParentType, ContextType, RequireFields<SubscriptionmetadataUpdatesArgs, 'skip' | 'first' | 'subgraphError'>>;
  registerCreated?: SubscriptionResolver<Maybe<ResolversTypes['RegisterCreated']>, "registerCreated", ParentType, ContextType, RequireFields<SubscriptionregisterCreatedArgs, 'id' | 'subgraphError'>>;
  registerCreateds?: SubscriptionResolver<Array<ResolversTypes['RegisterCreated']>, "registerCreateds", ParentType, ContextType, RequireFields<SubscriptionregisterCreatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transfer?: SubscriptionResolver<Maybe<ResolversTypes['Transfer']>, "transfer", ParentType, ContextType, RequireFields<SubscriptiontransferArgs, 'id' | 'subgraphError'>>;
  transfers?: SubscriptionResolver<Array<ResolversTypes['Transfer']>, "transfers", ParentType, ContextType, RequireFields<SubscriptiontransfersArgs, 'skip' | 'first' | 'subgraphError'>>;
  verificationTaskCreated?: SubscriptionResolver<Maybe<ResolversTypes['VerificationTaskCreated']>, "verificationTaskCreated", ParentType, ContextType, RequireFields<SubscriptionverificationTaskCreatedArgs, 'id' | 'subgraphError'>>;
  verificationTaskCreateds?: SubscriptionResolver<Array<ResolversTypes['VerificationTaskCreated']>, "verificationTaskCreateds", ParentType, ContextType, RequireFields<SubscriptionverificationTaskCreatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  verificationTaskUpdated?: SubscriptionResolver<Maybe<ResolversTypes['VerificationTaskUpdated']>, "verificationTaskUpdated", ParentType, ContextType, RequireFields<SubscriptionverificationTaskUpdatedArgs, 'id' | 'subgraphError'>>;
  verificationTaskUpdateds?: SubscriptionResolver<Array<ResolversTypes['VerificationTaskUpdated']>, "verificationTaskUpdateds", ParentType, ContextType, RequireFields<SubscriptionverificationTaskUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  verificationTaskValidated?: SubscriptionResolver<Maybe<ResolversTypes['VerificationTaskValidated']>, "verificationTaskValidated", ParentType, ContextType, RequireFields<SubscriptionverificationTaskValidatedArgs, 'id' | 'subgraphError'>>;
  verificationTaskValidateds?: SubscriptionResolver<Array<ResolversTypes['VerificationTaskValidated']>, "verificationTaskValidateds", ParentType, ContextType, RequireFields<SubscriptionverificationTaskValidatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  verifierAccountUpdated?: SubscriptionResolver<Maybe<ResolversTypes['VerifierAccountUpdated']>, "verifierAccountUpdated", ParentType, ContextType, RequireFields<SubscriptionverifierAccountUpdatedArgs, 'id' | 'subgraphError'>>;
  verifierAccountUpdateds?: SubscriptionResolver<Array<ResolversTypes['VerifierAccountUpdated']>, "verifierAccountUpdateds", ParentType, ContextType, RequireFields<SubscriptionverifierAccountUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  verifierAddedToCompany?: SubscriptionResolver<Maybe<ResolversTypes['VerifierAddedToCompany']>, "verifierAddedToCompany", ParentType, ContextType, RequireFields<SubscriptionverifierAddedToCompanyArgs, 'id' | 'subgraphError'>>;
  verifierAddedToCompanies?: SubscriptionResolver<Array<ResolversTypes['VerifierAddedToCompany']>, "verifierAddedToCompanies", ParentType, ContextType, RequireFields<SubscriptionverifierAddedToCompaniesArgs, 'skip' | 'first' | 'subgraphError'>>;
  verifierCreated?: SubscriptionResolver<Maybe<ResolversTypes['VerifierCreated']>, "verifierCreated", ParentType, ContextType, RequireFields<SubscriptionverifierCreatedArgs, 'id' | 'subgraphError'>>;
  verifierCreateds?: SubscriptionResolver<Array<ResolversTypes['VerifierCreated']>, "verifierCreateds", ParentType, ContextType, RequireFields<SubscriptionverifierCreatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type TransferResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Transfer'] = ResolversParentTypes['Transfer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VerificationTaskCreatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['VerificationTaskCreated'] = ResolversParentTypes['VerificationTaskCreated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _company?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _verifier?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _registerId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  _securityType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _taskId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  _taskStatus?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  _siteName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VerificationTaskUpdatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['VerificationTaskUpdated'] = ResolversParentTypes['VerificationTaskUpdated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _company?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _taskId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  _taskStatus?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VerificationTaskValidatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['VerificationTaskValidated'] = ResolversParentTypes['VerificationTaskValidated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _verifier?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _taskId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  _taskStatus?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VerifierAccountUpdatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['VerifierAccountUpdated'] = ResolversParentTypes['VerifierAccountUpdated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _verifier?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _account?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _action?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VerifierAddedToCompanyResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['VerifierAddedToCompany'] = ResolversParentTypes['VerifierAddedToCompany']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _company?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _verifier?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VerifierCreatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['VerifierCreated'] = ResolversParentTypes['VerifierCreated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _verifier?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _addressName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _siret?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _approvalNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Approval?: ApprovalResolvers<ContextType>;
  ApprovalForAll?: ApprovalForAllResolvers<ContextType>;
  BatchMetadataUpdate?: BatchMetadataUpdateResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  CompanyAccountUpdated?: CompanyAccountUpdatedResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  MetadataUpdate?: MetadataUpdateResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegisterCreated?: RegisterCreatedResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Transfer?: TransferResolvers<ContextType>;
  VerificationTaskCreated?: VerificationTaskCreatedResolvers<ContextType>;
  VerificationTaskUpdated?: VerificationTaskUpdatedResolvers<ContextType>;
  VerificationTaskValidated?: VerificationTaskValidatedResolvers<ContextType>;
  VerifierAccountUpdated?: VerifierAccountUpdatedResolvers<ContextType>;
  VerifierAddedToCompany?: VerifierAddedToCompanyResolvers<ContextType>;
  VerifierCreated?: VerifierCreatedResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = SecurityRegisterTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/SecurityRegister/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const securityRegisterTransforms = [];
const additionalTypeDefs = [] as any[];
const securityRegisterHandler = new GraphqlHandler({
              name: "SecurityRegister",
              config: {"endpoint":"https://api.studio.thegraph.com/query/51390/securityregister/0.0.2"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("SecurityRegister"),
              logger: logger.child("SecurityRegister"),
              importFn,
            });
securityRegisterTransforms[0] = new AutoPaginationTransform({
                  apiName: "SecurityRegister",
                  config: {"validateSchema":true,"limitOfRecords":5},
                  baseDir,
                  cache,
                  pubsub,
                  importFn,
                  logger,
                });
sources[0] = {
          name: 'SecurityRegister',
          handler: securityRegisterHandler,
          transforms: securityRegisterTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: RegisterCreatedsDocument,
        get rawSDL() {
          return printWithCache(RegisterCreatedsDocument);
        },
        location: 'RegisterCreatedsDocument.graphql'
      },{
        document: CompanyAccountUpdatedsDocument,
        get rawSDL() {
          return printWithCache(CompanyAccountUpdatedsDocument);
        },
        location: 'CompanyAccountUpdatedsDocument.graphql'
      },{
        document: VerifierCreatedsDocument,
        get rawSDL() {
          return printWithCache(VerifierCreatedsDocument);
        },
        location: 'VerifierCreatedsDocument.graphql'
      },{
        document: VerifierAccountUpdatedsDocument,
        get rawSDL() {
          return printWithCache(VerifierAccountUpdatedsDocument);
        },
        location: 'VerifierAccountUpdatedsDocument.graphql'
      },{
        document: VerifierAddedToCompaniesDocument,
        get rawSDL() {
          return printWithCache(VerifierAddedToCompaniesDocument);
        },
        location: 'VerifierAddedToCompaniesDocument.graphql'
      },{
        document: VerificationTaskValidatedsDocument,
        get rawSDL() {
          return printWithCache(VerificationTaskValidatedsDocument);
        },
        location: 'VerificationTaskValidatedsDocument.graphql'
      },{
        document: VerificationTaskUpdatedsDocument,
        get rawSDL() {
          return printWithCache(VerificationTaskUpdatedsDocument);
        },
        location: 'VerificationTaskUpdatedsDocument.graphql'
      },{
        document: VerificationTaskCreatedsDocument,
        get rawSDL() {
          return printWithCache(VerificationTaskCreatedsDocument);
        },
        location: 'VerificationTaskCreatedsDocument.graphql'
      },{
        document: VerificationTaskCreatedByIdDocument,
        get rawSDL() {
          return printWithCache(VerificationTaskCreatedByIdDocument);
        },
        location: 'VerificationTaskCreatedByIdDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type RegisterCreatedsQueryVariables = Exact<{ [key: string]: never; }>;


export type RegisterCreatedsQuery = { registerCreateds: Array<Pick<RegisterCreated, 'id' | '_siteName' | '_siteAddressName' | '_siret' | '_name' | '_addressName' | '_addr'>> };

export type CompanyAccountUpdatedsQueryVariables = Exact<{ [key: string]: never; }>;


export type CompanyAccountUpdatedsQuery = { companyAccountUpdateds: Array<Pick<CompanyAccountUpdated, 'id' | '_company' | '_account' | '_name' | '_firstName' | '_action'>> };

export type VerifierCreatedsQueryVariables = Exact<{ [key: string]: never; }>;


export type VerifierCreatedsQuery = { verifierCreateds: Array<Pick<VerifierCreated, 'id' | '_verifier' | '_name' | '_addressName' | '_siret' | '_approvalNumber'>> };

export type VerifierAccountUpdatedsQueryVariables = Exact<{ [key: string]: never; }>;


export type VerifierAccountUpdatedsQuery = { verifierAccountUpdateds: Array<Pick<VerifierAccountUpdated, 'id' | '_verifier' | '_account' | '_name' | '_firstName' | '_action'>> };

export type VerifierAddedToCompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type VerifierAddedToCompaniesQuery = { verifierAddedToCompanies: Array<Pick<VerifierAddedToCompany, 'id' | '_verifier' | '_company'>> };

export type VerificationTaskValidatedsQueryVariables = Exact<{ [key: string]: never; }>;


export type VerificationTaskValidatedsQuery = { verificationTaskValidateds: Array<Pick<VerificationTaskValidated, 'id' | '_verifier' | '_taskId' | '_taskStatus'>> };

export type VerificationTaskUpdatedsQueryVariables = Exact<{ [key: string]: never; }>;


export type VerificationTaskUpdatedsQuery = { verificationTaskUpdateds: Array<Pick<VerificationTaskUpdated, 'id' | '_company' | '_taskId' | '_taskStatus'>> };

export type VerificationTaskCreatedsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type VerificationTaskCreatedsQuery = { verificationTaskCreateds: Array<Pick<VerificationTaskCreated, 'id' | '_company' | '_verifier' | '_registerId' | '_securityType' | '_taskId' | '_taskStatus' | '_siteName' | '_timestamp'>> };

export type VerificationTaskCreatedByIDQueryVariables = Exact<{
  _company?: InputMaybe<Scalars['Bytes']>;
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type VerificationTaskCreatedByIDQuery = { verificationTaskCreateds: Array<Pick<VerificationTaskCreated, 'id' | '_company' | '_verifier' | '_registerId' | '_securityType' | '_taskId' | '_taskStatus' | '_siteName' | '_timestamp'>> };


export const RegisterCreatedsDocument = gql`
    query RegisterCreateds {
  registerCreateds {
    id
    _siteName
    _siteAddressName
    _siret
    _name
    _addressName
    _addr
  }
}
    ` as unknown as DocumentNode<RegisterCreatedsQuery, RegisterCreatedsQueryVariables>;
export const CompanyAccountUpdatedsDocument = gql`
    query CompanyAccountUpdateds {
  companyAccountUpdateds {
    id
    _company
    _account
    _name
    _firstName
    _action
  }
}
    ` as unknown as DocumentNode<CompanyAccountUpdatedsQuery, CompanyAccountUpdatedsQueryVariables>;
export const VerifierCreatedsDocument = gql`
    query VerifierCreateds {
  verifierCreateds {
    id
    _verifier
    _name
    _addressName
    _siret
    _approvalNumber
  }
}
    ` as unknown as DocumentNode<VerifierCreatedsQuery, VerifierCreatedsQueryVariables>;
export const VerifierAccountUpdatedsDocument = gql`
    query VerifierAccountUpdateds {
  verifierAccountUpdateds {
    id
    _verifier
    _account
    _name
    _firstName
    _action
  }
}
    ` as unknown as DocumentNode<VerifierAccountUpdatedsQuery, VerifierAccountUpdatedsQueryVariables>;
export const VerifierAddedToCompaniesDocument = gql`
    query VerifierAddedToCompanies {
  verifierAddedToCompanies {
    id
    _verifier
    _company
  }
}
    ` as unknown as DocumentNode<VerifierAddedToCompaniesQuery, VerifierAddedToCompaniesQueryVariables>;
export const VerificationTaskValidatedsDocument = gql`
    query VerificationTaskValidateds {
  verificationTaskValidateds {
    id
    _verifier
    _taskId
    _taskStatus
  }
}
    ` as unknown as DocumentNode<VerificationTaskValidatedsQuery, VerificationTaskValidatedsQueryVariables>;
export const VerificationTaskUpdatedsDocument = gql`
    query VerificationTaskUpdateds {
  verificationTaskUpdateds {
    id
    _company
    _taskId
    _taskStatus
  }
}
    ` as unknown as DocumentNode<VerificationTaskUpdatedsQuery, VerificationTaskUpdatedsQueryVariables>;
export const VerificationTaskCreatedsDocument = gql`
    query VerificationTaskCreateds($first: Int, $skip: Int) {
  verificationTaskCreateds(
    first: $first
    skip: $skip
    orderBy: _timestamp
    orderDirection: desc
  ) {
    id
    _company
    _verifier
    _registerId
    _securityType
    _taskId
    _taskStatus
    _siteName
    _timestamp
  }
}
    ` as unknown as DocumentNode<VerificationTaskCreatedsQuery, VerificationTaskCreatedsQueryVariables>;
export const VerificationTaskCreatedByIDDocument = gql`
    query VerificationTaskCreatedByID($_company: Bytes, $first: Int, $skip: Int) {
  verificationTaskCreateds(
    first: $first
    skip: $skip
    where: {_company: $_company}
    orderBy: _timestamp
    orderDirection: desc
  ) {
    id
    _company
    _verifier
    _registerId
    _securityType
    _taskId
    _taskStatus
    _siteName
    _timestamp
  }
}
    ` as unknown as DocumentNode<VerificationTaskCreatedByIDQuery, VerificationTaskCreatedByIDQueryVariables>;










export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    RegisterCreateds(variables?: RegisterCreatedsQueryVariables, options?: C): Promise<RegisterCreatedsQuery> {
      return requester<RegisterCreatedsQuery, RegisterCreatedsQueryVariables>(RegisterCreatedsDocument, variables, options) as Promise<RegisterCreatedsQuery>;
    },
    CompanyAccountUpdateds(variables?: CompanyAccountUpdatedsQueryVariables, options?: C): Promise<CompanyAccountUpdatedsQuery> {
      return requester<CompanyAccountUpdatedsQuery, CompanyAccountUpdatedsQueryVariables>(CompanyAccountUpdatedsDocument, variables, options) as Promise<CompanyAccountUpdatedsQuery>;
    },
    VerifierCreateds(variables?: VerifierCreatedsQueryVariables, options?: C): Promise<VerifierCreatedsQuery> {
      return requester<VerifierCreatedsQuery, VerifierCreatedsQueryVariables>(VerifierCreatedsDocument, variables, options) as Promise<VerifierCreatedsQuery>;
    },
    VerifierAccountUpdateds(variables?: VerifierAccountUpdatedsQueryVariables, options?: C): Promise<VerifierAccountUpdatedsQuery> {
      return requester<VerifierAccountUpdatedsQuery, VerifierAccountUpdatedsQueryVariables>(VerifierAccountUpdatedsDocument, variables, options) as Promise<VerifierAccountUpdatedsQuery>;
    },
    VerifierAddedToCompanies(variables?: VerifierAddedToCompaniesQueryVariables, options?: C): Promise<VerifierAddedToCompaniesQuery> {
      return requester<VerifierAddedToCompaniesQuery, VerifierAddedToCompaniesQueryVariables>(VerifierAddedToCompaniesDocument, variables, options) as Promise<VerifierAddedToCompaniesQuery>;
    },
    VerificationTaskValidateds(variables?: VerificationTaskValidatedsQueryVariables, options?: C): Promise<VerificationTaskValidatedsQuery> {
      return requester<VerificationTaskValidatedsQuery, VerificationTaskValidatedsQueryVariables>(VerificationTaskValidatedsDocument, variables, options) as Promise<VerificationTaskValidatedsQuery>;
    },
    VerificationTaskUpdateds(variables?: VerificationTaskUpdatedsQueryVariables, options?: C): Promise<VerificationTaskUpdatedsQuery> {
      return requester<VerificationTaskUpdatedsQuery, VerificationTaskUpdatedsQueryVariables>(VerificationTaskUpdatedsDocument, variables, options) as Promise<VerificationTaskUpdatedsQuery>;
    },
    VerificationTaskCreateds(variables?: VerificationTaskCreatedsQueryVariables, options?: C): Promise<VerificationTaskCreatedsQuery> {
      return requester<VerificationTaskCreatedsQuery, VerificationTaskCreatedsQueryVariables>(VerificationTaskCreatedsDocument, variables, options) as Promise<VerificationTaskCreatedsQuery>;
    },
    VerificationTaskCreatedByID(variables?: VerificationTaskCreatedByIDQueryVariables, options?: C): Promise<VerificationTaskCreatedByIDQuery> {
      return requester<VerificationTaskCreatedByIDQuery, VerificationTaskCreatedByIDQueryVariables>(VerificationTaskCreatedByIDDocument, variables, options) as Promise<VerificationTaskCreatedByIDQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;