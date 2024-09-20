#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e


############################################ admin funtion start here #####################################

dfx identity use nftuser3;
# LEDGERID=$(dfx ledger account-id);
# echo $LEDGERID

# USER_PRINCIPAL=$(dfx identity get-principal)
# CANISTER=$(dfx canister id BeGod_backend)
# echo "USER_PRINCIPAL: $USER_PRINCIPAL"
# echo "CANISTER: $CANISTER"







# STEP-1
# creating new collection

# dfx canister call "$CANISTER" createExtCollection '("Celtic", "https://picsum.photos/200/300", "{\"Name\":\"chandan\"}")'

# Getting Result Like this
# (
#   principal "oz7jj-hclyb-5r7nw-ehlam-34yct-ktxcg-2wsq2-53not-tbxed-ru5vq-eae",
#   principal "bw4dl-smaaa-aaaaa-qaacq-cai",
# )

COLLECTION_ID="bw4dl-smaaa-aaaaa-qaacq-cai"
echo "COLLECTION_ID: $COLLECTION_ID"











# STEP-2
# add nft in the collection

dfx canister call "$CANISTER" mintExtNonFungible '(
  principal "'$COLLECTION_ID'",
  "first nft",
  "this is the my first nft",
  "new data",
  "https://thisisthdata.jpg",
  opt variant {
    json = "{\"name\":\"vishwakarma\"}"
  },
  1
)'

# Getting Result Like this of same NFT 10 data
# # (vec {
#     0 : nat32;
#     1 : nat32;
#     2 : nat32;
#     3 : nat32;
#     4 : nat32;
#     5 : nat32;
#     6 : nat32;
#     7 : nat32;
#     8 : nat32;
#     9 : nat32;
#   })

# Just suppose that we are going to list token 0

# NFTID="0"
# echo "NFTID: $NFTID"














# STEP-3
# Getting actual NFT ID TokenIdentifier

# dfx canister call "$CANISTER" getNftTokenId "(principal \"$COLLECTION_ID\", $NFTID)"

# Getting Result Like this
# ("yxwtr-bqkor-uwjaa-aaaaa-aeaaa-uaqca-aaaaa-a")















# STEP-4
# Set Price and List the NFT

# TOKENIDENTIFIER='yxwtr-bqkor-uwjaa-aaaaa-aeaaa-uaqca-aaaaa-a'
# TOKENID='1'
# PRICE=100_000_000
# # in e8s
# PRICEE8S=100000000
# echo "TOKENIDENTIFIER: $TOKENIDENTIFIER"
# echo "PRICE: $PRICE"

# dfx canister call $CANISTER listprice '(principal "'$COLLECTION_ID'", record {token="'$TOKENIDENTIFIER'"; from_subaccount=null; price= opt '$PRICE'})';















# STEP-5
# Get the All NFT listing

# dfx canister call $CANISTER listings '(principal "'$COLLECTION_ID'")';

# (
#   vec {
#     record {
#       0 : nat32;
#       record {
#         locked = null;
#         seller = principal "2ipdv-mwghn-c5x64-fkchv-hbvge-yobre-szmep-6ntkb-d3a3h-w5jg6-zqe";
#         price = 100_000_000 : nat64;
#       };
#       variant {
#         nonfungible = record {
#           thumbnail = "https://thisisthdata.jpg";
#           asset = "new data";
#           metadata = opt variant { json = "{\"name\":\"vishwakarma\"}" };
#           name = "first nft";
#           description = "this is the my first nft";
#         }
#       };
#     };
#   },
# )

############################################ admin funtion over here #####################################













########################## Other User Start From Here #####################################



# dfx identity use default

# # STEP-6
# # Purchase NFT

# BUYERIDENTIFIER=$(dfx identity get-principal);
# dfx canister call $CANISTER purchaseNft '(principal "'$COLLECTION_ID'","'$TOKENIDENTIFIER'",'$PRICE',"'$BUYERIDENTIFIER'")';

# (
#   variant {
#     ok = record {
#       "423f664cc96b0d8400320b3efd023db3373093284be7e0a72536df811d83c03d";
#       100_000_000 : nat64;
#     }
#   },
# )








# Note: Before call the send_balance_and_nft make sure you are Topup your backend canister by given below command ex: recharge 50ICP to backend.

# dfx canister call icp_ledger_canister icrc1_transfer "(record { to = record { owner = principal \"be2us-64aaa-aaaaa-qaabq-cai\";}; amount = 5_000_000_000;})"

# # step 7 & step 8


# PURCHASENFTTXNID='0b98262a0be0b89c30709980fa282263d29c9f2d8ff465135f466a0eb4a93834'
# SUBACCOUNT=null;

# dfx canister call $CANISTER send_balance_and_nft '(principal "'$COLLECTION_ID'","'$PURCHASENFTTXNID'",'$PRICEE8S','$SUBACCOUNT')';













# # STEP-7
# # Send Balance to the Creater
# Note: 1 ICP = 1 * 10^8 = 100000000


# export DEFAULT_ACCOUNT_ID=$(dfx ledger account-id)
# echo "DEFAULT_ACCOUNT_ID: $DEFAULT_ACCOUNT_ID"
# CHANDAN_ACCOUNT_ID='0b98262a0be0b89c30709980fa282263d29c9f2d8ff465135f466a0eb4a93834';

# block_height=$(dfx canister call icp_ledger_canister send_dfx "(record {
#     to = \"$PURCHASENFTTXNID\";
#     from = \"$DEFAULT_ACCOUNT_ID\";
#     amount = record { e8s = $PRICEE8S : nat64 };
#     fee = record { e8s = 10000 : nat64 };
#     memo = 0;
#     created_at_time = null;
# })")

# echo "Transaction sent. Block height: $block_height"

# balance=$(dfx canister call icp_ledger_canister account_balance_dfx "(record {account = \"$DEFAULT_ACCOUNT_ID\";})")
# echo "Balance of the default account: $balance"

# Transaction sent. Block height: (1 : nat64)
# Balance of the default account: (record { e8s = 9_899_990_000 : nat64 })











# STEP-8
# Settelment NFT

# dfx canister call $CANISTER settlepurchase '(principal "'$COLLECTION_ID'","'$PURCHASENFTTXNID'")';

# (variant { ok })














# STEP-9
# Show NFT Txns

# dfx canister call $CANISTER transactions '(principal "'$COLLECTION_ID'")';

# (
#   vec {
#     record {
#       token = 0 : nat32;
#       time = 1_725_608_961_776_698_764 : int;
#       seller = "492aacd082a520dfc078678759756ef4ac11133083799c77d4acc7a3490cb5ec";
#       buyer = "oz7jj-hclyb-5r7nw-ehlam-34yct-ktxcg-2wsq2-53not-tbxed-ru5vq-eae";
#       price = 100_000_000 : nat64;
#     };
#   },
# )












# STEP-10
#Check User Purchase NFT

# dfx canister call $CANISTER getSingleNonFungibleTokens '(principal "'$COLLECTION_ID'",'$NFTID')';

# (
#   vec {
#     record {
#       0 : nat32;
#       "oz7jj-hclyb-5r7nw-ehlam-34yct-ktxcg-2wsq2-53not-tbxed-ru5vq-eae";
#       variant {
#         nonfungible = record {
#           thumbnail = "https://thisisthdata.jpg";
#           asset = "new data";
#           metadata = opt variant { json = "{\"name\":\"vishwakarma\"}" };
#           name = "first nft";
#           description = "this is the my first nft";
#         }
#       };
#     };
#   },
# )



########################## Other User Start END Here #####################################