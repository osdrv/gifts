# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_gift.me_session',
  :secret      => '173b6daa7b8758fddcf957d1a87aa6e030bc4042b5187c60c5c619f094b46caedab0dcb5c1a27a2bcaeff0b546a3e2ae21ddfb602c8457210cf8acfa495badf6'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
