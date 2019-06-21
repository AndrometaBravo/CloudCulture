class Tag < ApplicationRecord
    validates :tagname_id, presence: true

    belongs_to :user
    belongs_to :tagname
    belongs_to :post

end
