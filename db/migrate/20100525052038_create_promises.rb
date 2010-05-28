class CreatePromises < ActiveRecord::Migration
  def self.up
    create_table :promises do |t|
      t.references :user
      t.references :gift
      
      t.timestamps
    end
  end

  def self.down
    drop_table :promises
  end
end
