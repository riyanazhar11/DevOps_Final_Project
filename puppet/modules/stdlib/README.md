# Stdlib Module

## Overview

This module provides a collection of standard library functions and types for Puppet. It includes a wide range of utility functions and types that can be used across different modules and configurations.

## Usage

### Functions

- `file_line`: Manages lines in files.
- `has_interface_with`: Checks if a network interface has a specific property.
- `has_ip_address`: Checks if a network interface has a specific IP address.
- `has_ip_network`: Checks if a network interface is in a specific network.

### Types

- `absolute_path`: Ensures a value is an absolute path.
- `base32`: Ensures a value is a base32 encoded string.
- `base64`: Ensures a value is a base64 encoded string.
- `createresources`: Creates resources from a hash.
- `data_size`: Ensures a value is a valid data size.
- `email`: Ensures a value is a valid email address.
- `file_mode`: Ensures a value is a valid file mode.
- `file_source`: Ensures a value is a valid file source.
- `fqdn`: Ensures a value is a valid fully qualified domain name.
- `host`: Ensures a value is a valid host.
- `http_status`: Ensures a value is a valid HTTP status code.
- `https_url`: Ensures a value is a valid HTTPS URL.
- `http_url`: Ensures a value is a valid HTTP URL.
- `mac`: Ensures a value is a valid MAC address.
- `object_store`: Ensures a value is a valid object store.
- `port`: Ensures a value is a valid port number.
- `syslog_facility`: Ensures a value is a valid syslog facility.
- `unix_path`: Ensures a value is a valid Unix path.
- `windows_path`: Ensures a value is a valid Windows path.
- `yes_no`: Ensures a value is a valid yes/no value.

## Example

```puppet
# Ensure a file has a specific line
file_line { 'ensure_line':
  path   => '/etc/hosts',
  line   => '127.0.0.1 example.com',
  match  => '^127\.0\.0\.1',
  ensure => present,
}

# Check if a network interface has a specific IP address
if has_ip_address('eth0', '192.168.1.100') {
  notify { 'eth0 has IP 192.168.1.100': }
}
```

## Dependencies

- None

## Contributing

Contributions are welcome! Please submit pull requests or open issues on the project's GitHub repository.

## License

This module is released under the Apache License, Version 2.0.
