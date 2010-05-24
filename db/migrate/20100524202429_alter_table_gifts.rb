class AlterTableGifts < ActiveRecord::Migration
  def self.up
    execute <<-SQL
      ALTER TABLE gifts 
      MODIFY COLUMN access
      INT(11) NOT NULL DEFAULT 1
    SQL
  end

  def self.down
    execute <<-SQL
      ALTER TABLE gifts
      MODIFY COLUMN access
      INT(11) DEFAULT NULL
    SQL
  end
end
