class CreateGifts < ActiveRecord::Migration
  def self.up
    create_table :gifts do |t|
      t.string :pic_url
      t.string :name
      t.integer :access
      t.integer :state
      t.references :user

      t.timestamps
    end
  end

  def self.down
    drop_table :gifts
  end
end
