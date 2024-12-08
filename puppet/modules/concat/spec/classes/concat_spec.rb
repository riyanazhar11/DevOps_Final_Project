require 'spec_helper'

describe 'concat' do
  context 'with default parameters' do
    it { should compile }
    it { should contain_class('concat') }
  end
end
