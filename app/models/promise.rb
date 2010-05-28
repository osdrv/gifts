class Promise < ActiveRecord::Base
  belongs_to :user
  has_one :gift
end
