require 'rspec-puppet'
require 'puppetlabs_spec_helper/module_spec_helper'

RSpec.configure do |c|
  c.module_path = File.join(File.dirname(__FILE__), '..', '..')
  c.manifest_dir = File.join(File.dirname(__FILE__), '..', '..')
end
