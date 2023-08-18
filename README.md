# kloth

A React client application for [kapi](https://github.com/kiran-evans/kapi).

## Auth State handling

When the auth state changes, perform one of two actions:
- if `user` is `null` (i.e. user is visiting for the first time or has just signed out)
    1. sign in anonymously
    2. create new user in db (also creating blank cart)
    3. set `state.cartItems` to be an empty cart
- if `user` is an existing auth user (i.e. the user has just signed in)
    1. add the contents of the current `state.cartItems` to the user's cart in the db (both of which contain 0 or more items)
    2. set `state.cartItems` to the user's (now up-to-date) cart from the db. This ensures that if a user is browsing anonymously and then signs in later, their cart from any previous sessions where they didn't checkout is combined with their current session, so nothing is lost.