class CreateTableWishes < ActiveRecord::Migration
  def self.up
    create_table :gifts do |t|
      t.integer :user_id
      t.string :pic_url
      t.string :name
      t.integer :access
      t.integer :state
      t.timestamps
    end
    add_index :gifts, :user_id
  end

  def self.down
    drop_table :gifts
  end
end
