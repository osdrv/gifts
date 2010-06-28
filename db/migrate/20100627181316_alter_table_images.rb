class AlterTableImages < ActiveRecord::Migration
  def self.up
    add_column :images, :file_name, :string
  end

  def self.down
    remove_column :images, :file_name
  end
end
