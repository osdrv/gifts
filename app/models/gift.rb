class Gift < ActiveRecord::Base
  belongs_to :user
  has_one :promise
  
  validates_presence_of :name
  validates_length_of :name, :within => 3..255
  validates_presence_of :user_id
  
  def promised?
    return self.state == 1
  end
  
  def done?
    return self.state == 2
  end
  
  def user
    return User.find(self.user_id)
  end
end
