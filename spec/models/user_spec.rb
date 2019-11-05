require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#new' do

    it "is invalid without a name" do
      user = build(:user, name:"")
      user.valid?
      expect(user.errors[:name]).to eq([])
    end
  end
end