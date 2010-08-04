class Gift < ActiveRecord::Base
  belongs_to :user
  has_one :promise
  has_one :image
  
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
  
  def self.get_recent_wishes(limit = 10)
    Gift.all(:conditions => "access = 1 AND state >= 0", :order => "updated_at DESC", :limit => limit)
  end
  
  def owner_name
    self.user.login
  end
  
  def image= (image)
    self.image_id = image
  end
  
  def image
    if self.image_id
      Image.find(self.image_id)
    end
  end
end
