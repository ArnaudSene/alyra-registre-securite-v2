// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace SecurityRegisterTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

  export type QuerySdk = {
      /** null **/
  approval: InContextSdkMethod<Query['approval'], QueryapprovalArgs, MeshContext>,
  /** null **/
  approvals: InContextSdkMethod<Query['approvals'], QueryapprovalsArgs, MeshContext>,
  /** null **/
  approvalForAll: InContextSdkMethod<Query['approvalForAll'], QueryapprovalForAllArgs, MeshContext>,
  /** null **/
  approvalForAlls: InContextSdkMethod<Query['approvalForAlls'], QueryapprovalForAllsArgs, MeshContext>,
  /** null **/
  batchMetadataUpdate: InContextSdkMethod<Query['batchMetadataUpdate'], QuerybatchMetadataUpdateArgs, MeshContext>,
  /** null **/
  batchMetadataUpdates: InContextSdkMethod<Query['batchMetadataUpdates'], QuerybatchMetadataUpdatesArgs, MeshContext>,
  /** null **/
  companyAccountUpdated: InContextSdkMethod<Query['companyAccountUpdated'], QuerycompanyAccountUpdatedArgs, MeshContext>,
  /** null **/
  companyAccountUpdateds: InContextSdkMethod<Query['companyAccountUpdateds'], QuerycompanyAccountUpdatedsArgs, MeshContext>,
  /** null **/
  metadataUpdate: InContextSdkMethod<Query['metadataUpdate'], QuerymetadataUpdateArgs, MeshContext>,
  /** null **/
  metadataUpdates: InContextSdkMethod<Query['metadataUpdates'], QuerymetadataUpdatesArgs, MeshContext>,
  /** null **/
  registerCreated: InContextSdkMethod<Query['registerCreated'], QueryregisterCreatedArgs, MeshContext>,
  /** null **/
  registerCreateds: InContextSdkMethod<Query['registerCreateds'], QueryregisterCreatedsArgs, MeshContext>,
  /** null **/
  transfer: InContextSdkMethod<Query['transfer'], QuerytransferArgs, MeshContext>,
  /** null **/
  transfers: InContextSdkMethod<Query['transfers'], QuerytransfersArgs, MeshContext>,
  /** null **/
  verificationTaskCreated: InContextSdkMethod<Query['verificationTaskCreated'], QueryverificationTaskCreatedArgs, MeshContext>,
  /** null **/
  verificationTaskCreateds: InContextSdkMethod<Query['verificationTaskCreateds'], QueryverificationTaskCreatedsArgs, MeshContext>,
  /** null **/
  verificationTaskUpdated: InContextSdkMethod<Query['verificationTaskUpdated'], QueryverificationTaskUpdatedArgs, MeshContext>,
  /** null **/
  verificationTaskUpdateds: InContextSdkMethod<Query['verificationTaskUpdateds'], QueryverificationTaskUpdatedsArgs, MeshContext>,
  /** null **/
  verificationTaskValidated: InContextSdkMethod<Query['verificationTaskValidated'], QueryverificationTaskValidatedArgs, MeshContext>,
  /** null **/
  verificationTaskValidateds: InContextSdkMethod<Query['verificationTaskValidateds'], QueryverificationTaskValidatedsArgs, MeshContext>,
  /** null **/
  verifierAccountUpdated: InContextSdkMethod<Query['verifierAccountUpdated'], QueryverifierAccountUpdatedArgs, MeshContext>,
  /** null **/
  verifierAccountUpdateds: InContextSdkMethod<Query['verifierAccountUpdateds'], QueryverifierAccountUpdatedsArgs, MeshContext>,
  /** null **/
  verifierAddedToCompany: InContextSdkMethod<Query['verifierAddedToCompany'], QueryverifierAddedToCompanyArgs, MeshContext>,
  /** null **/
  verifierAddedToCompanies: InContextSdkMethod<Query['verifierAddedToCompanies'], QueryverifierAddedToCompaniesArgs, MeshContext>,
  /** null **/
  verifierCreated: InContextSdkMethod<Query['verifierCreated'], QueryverifierCreatedArgs, MeshContext>,
  /** null **/
  verifierCreateds: InContextSdkMethod<Query['verifierCreateds'], QueryverifierCreatedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  approval: InContextSdkMethod<Subscription['approval'], SubscriptionapprovalArgs, MeshContext>,
  /** null **/
  approvals: InContextSdkMethod<Subscription['approvals'], SubscriptionapprovalsArgs, MeshContext>,
  /** null **/
  approvalForAll: InContextSdkMethod<Subscription['approvalForAll'], SubscriptionapprovalForAllArgs, MeshContext>,
  /** null **/
  approvalForAlls: InContextSdkMethod<Subscription['approvalForAlls'], SubscriptionapprovalForAllsArgs, MeshContext>,
  /** null **/
  batchMetadataUpdate: InContextSdkMethod<Subscription['batchMetadataUpdate'], SubscriptionbatchMetadataUpdateArgs, MeshContext>,
  /** null **/
  batchMetadataUpdates: InContextSdkMethod<Subscription['batchMetadataUpdates'], SubscriptionbatchMetadataUpdatesArgs, MeshContext>,
  /** null **/
  companyAccountUpdated: InContextSdkMethod<Subscription['companyAccountUpdated'], SubscriptioncompanyAccountUpdatedArgs, MeshContext>,
  /** null **/
  companyAccountUpdateds: InContextSdkMethod<Subscription['companyAccountUpdateds'], SubscriptioncompanyAccountUpdatedsArgs, MeshContext>,
  /** null **/
  metadataUpdate: InContextSdkMethod<Subscription['metadataUpdate'], SubscriptionmetadataUpdateArgs, MeshContext>,
  /** null **/
  metadataUpdates: InContextSdkMethod<Subscription['metadataUpdates'], SubscriptionmetadataUpdatesArgs, MeshContext>,
  /** null **/
  registerCreated: InContextSdkMethod<Subscription['registerCreated'], SubscriptionregisterCreatedArgs, MeshContext>,
  /** null **/
  registerCreateds: InContextSdkMethod<Subscription['registerCreateds'], SubscriptionregisterCreatedsArgs, MeshContext>,
  /** null **/
  transfer: InContextSdkMethod<Subscription['transfer'], SubscriptiontransferArgs, MeshContext>,
  /** null **/
  transfers: InContextSdkMethod<Subscription['transfers'], SubscriptiontransfersArgs, MeshContext>,
  /** null **/
  verificationTaskCreated: InContextSdkMethod<Subscription['verificationTaskCreated'], SubscriptionverificationTaskCreatedArgs, MeshContext>,
  /** null **/
  verificationTaskCreateds: InContextSdkMethod<Subscription['verificationTaskCreateds'], SubscriptionverificationTaskCreatedsArgs, MeshContext>,
  /** null **/
  verificationTaskUpdated: InContextSdkMethod<Subscription['verificationTaskUpdated'], SubscriptionverificationTaskUpdatedArgs, MeshContext>,
  /** null **/
  verificationTaskUpdateds: InContextSdkMethod<Subscription['verificationTaskUpdateds'], SubscriptionverificationTaskUpdatedsArgs, MeshContext>,
  /** null **/
  verificationTaskValidated: InContextSdkMethod<Subscription['verificationTaskValidated'], SubscriptionverificationTaskValidatedArgs, MeshContext>,
  /** null **/
  verificationTaskValidateds: InContextSdkMethod<Subscription['verificationTaskValidateds'], SubscriptionverificationTaskValidatedsArgs, MeshContext>,
  /** null **/
  verifierAccountUpdated: InContextSdkMethod<Subscription['verifierAccountUpdated'], SubscriptionverifierAccountUpdatedArgs, MeshContext>,
  /** null **/
  verifierAccountUpdateds: InContextSdkMethod<Subscription['verifierAccountUpdateds'], SubscriptionverifierAccountUpdatedsArgs, MeshContext>,
  /** null **/
  verifierAddedToCompany: InContextSdkMethod<Subscription['verifierAddedToCompany'], SubscriptionverifierAddedToCompanyArgs, MeshContext>,
  /** null **/
  verifierAddedToCompanies: InContextSdkMethod<Subscription['verifierAddedToCompanies'], SubscriptionverifierAddedToCompaniesArgs, MeshContext>,
  /** null **/
  verifierCreated: InContextSdkMethod<Subscription['verifierCreated'], SubscriptionverifierCreatedArgs, MeshContext>,
  /** null **/
  verifierCreateds: InContextSdkMethod<Subscription['verifierCreateds'], SubscriptionverifierCreatedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["SecurityRegister"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
