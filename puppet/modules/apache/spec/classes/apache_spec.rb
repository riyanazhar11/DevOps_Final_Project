require 'spec_helper'

describe 'apache' do
  context 'with default parameters' do
    it { should compile }
    it { should contain_class('apache') }
  end
end
