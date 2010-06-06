class AlterTableFriendsAddId < ActiveRecord::Migration
  def self.up
    create_table :friends, :force => true do |t|
      t.integer :user_id
      t.integer :friend_id
      t.integer :status, :default => 0
      
      t.timestamps
    end
  end

  def self.down
    drop_table :friends
  end
end
