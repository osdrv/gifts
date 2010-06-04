class AlterTableGiftsAddStatus < ActiveRecord::Migration
  
  def self.up
    change_table :friends do |t|
      t.integer :status, :after => :friend_id, :default => 0
    end
  end

  def self.down
    remove_column :friends, :status
  end
end
