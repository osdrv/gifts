require 'mime/types'

class Image < ActiveRecord::Base
  has_one :user
  
  has_attached_file :image, :styles => { 
    :big => ["320x240>", :png],
    :thumbnail => ["50x30", :png]
  },
  :default_url => "/images/noimage.png",
  :url => "/system/:attachment/:id/:style_:basename.:extension"
  
  validates_attachment_content_type :image, :content_type => ['image/jpeg', 'image/jpg', 'image/pjpeg', 'image/png', 'image/gif']
  
  def image_file_name=(file_name)
    self.file_name = file_name
  end
  
  def image_content_type(*params)
    MIME::Types.type_for(self.file_name).to_s
  end
  
  def image_file_name(*params)
    self.file_name
  end
end
