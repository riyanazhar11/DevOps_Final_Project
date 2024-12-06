# Puppet manifest to manage the configuration of the project in the development environment

# Include the youronlineshop module
include youronlineshop

# Include the web server role
include roles::web_server
