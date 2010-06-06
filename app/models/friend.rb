class Friend < ActiveRecord::Base
  #
  # statuses:
  # 0 => new, unconfirmed
  # 1 => confirmed 
  # -1 => restricted
  #
  def self.users_friendship(user1, user2)
    Friend.first(:conditions => ["(friends.user_id = :user1 AND friends.friend_id = :user2) OR (friends.user_id = :user2 AND friends.friend_id = :user1)", { :user1 => user1, :user2 => user2 }])
  end
end
