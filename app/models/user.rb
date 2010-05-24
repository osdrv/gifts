require 'digest/sha1'

class User < ActiveRecord::Base
  include Authentication
  include Authentication::ByPassword
  include Authentication::ByCookieToken

  validates_presence_of     :login
  validates_length_of       :login,    :within => 3..40
  validates_uniqueness_of   :login
  validates_format_of       :login,    :with => Authentication.login_regex, :message => Authentication.bad_login_message

  validates_format_of       :name,     :with => Authentication.name_regex,  :message => Authentication.bad_name_message, :allow_nil => true
  validates_length_of       :name,     :maximum => 100

  validates_presence_of     :email
  validates_length_of       :email,    :within => 6..100 #r@a.wk
  validates_uniqueness_of   :email
  validates_format_of       :email,    :with => Authentication.email_regex, :message => Authentication.bad_email_message

  

  # HACK HACK HACK -- how to do attr_accessible from here?
  # prevents a user from submitting a crafted form that bypasses activation
  # anything else you want your user to change should be added here.
  attr_accessible :login, :email, :name, :password, :password_confirmation

  has_many :gifts
  
  def to_s
    self.login
  end
  
  # Authenticates a user by their login name and unencrypted password.  Returns the user or nil.
  #
  # uff.  this is really an authorization, not authentication routine.  
  # We really need a Dispatch Chain here or something.
  # This will also let us return a human error message.
  #
  def self.authenticate(login, password)
    return nil if login.blank? || password.blank?
    u = find_by_login(login.downcase) # need to get the salt
    u && u.authenticated?(password) ? u : nil
  end
  
  def self.search_like(name)
    self.all(:conditions => ["login LIKE :name OR name LIKE :name", { :name => '%' + name + '%'}])
  end
  
  def self.find_by_name(login)
    self.first(:conditions => ["login = :login", { :login => login }])
  end
  
  def login=(value)
    write_attribute :login, (value ? value.downcase : nil)
  end

  def email=(value)
    write_attribute :email, (value ? value.downcase : nil)
  end
  
  def is_me?(user)
    if user
      return user.id == self.id
    end
    false
  end
  
  def is_friend?(user)
    if user.class.to_s == "User"
      return true
    else
      return false
    end
  end
  
  def public_gifts(user)
    if self.is_friend?(user)
      return Gift.all(:conditions => ["access IN (1, 2) AND user_id = :user_id", { :user_id => self.id }])
    else
      return Gift.all(:conditions => ["access IN (1, 2) AND user_id = :user_id", { :user_id => self.id }])
    end
  end
  
  protected
    


end
