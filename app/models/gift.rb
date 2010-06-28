class Gift < ActiveRecord::Base
  belongs_to :user
  has_one :promise
  has_one :image
  
  validates_presence_of :name
  validates_length_of :name, :within => 3..255
  validates_presence_of :user_id
  
  has_attached_file :image, :styles => { 
    :big => "320x240>",
    :thumbnail => "50x30"
  },
  :default_url => "/:attachment/:style/noimage.jpg"
  
  def promised?
    return self.state == 1
  end
  
  def done?
    return self.state == 2
  end
  
  def user
    return User.find(self.user_id)
  end
  
  def self.get_recent_wishes
    Gift.all(:conditions => "access = 1 AND state >= 0", :order => "updated_at DESC", :limit => 10)
  end
  
  def owner_name
    self.user.login
  end
  
  def image_file_name=(file_name)
    i = Image.new(:file_name => file_name)
    i.save
    self.image_id = i.id
    self.save
  end
  
  def image_file_name(*paams)
    if self.image_id
      if i = Image.find(self.image_id)
        return i.file_name
      end
    end
    return nil
  end
end
