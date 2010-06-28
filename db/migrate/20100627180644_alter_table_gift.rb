class AlterTableGift < ActiveRecord::Migration
  def self.up
    add_column :gifts, :image_id, :integer
    remove_column :gifts, :pic_url
  end

  def self.down
    remove_column :gifts, :image_id
    add_column :gifts, :pic_url, :string
  end
end
