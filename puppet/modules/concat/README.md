# Concat Module

## Overview

This module manages concatenated files. It provides resources for managing files that are built from multiple fragments.

## Usage

### Classes

- `concat`: Main class for managing concatenated files.

### Resources

- `concat::fragment`: Manages individual fragments that are concatenated into a single file.

### Parameters

- `path`: The path to the concatenated file.
- `content`: The content of the fragment.
- `order`: The order in which the fragment should be concatenated.

## Example

```puppet
class { 'concat':
  path => '/etc/myfile.conf',
}

concat::fragment { 'fragment1':
  target  => '/etc/myfile.conf',
  content => 'This is the first fragment.',
  order   => '01',
}

concat::fragment { 'fragment2':
  target  => '/etc/myfile.conf',
  content => 'This is the second fragment.',
  order   => '02',
}
```

## Dependencies

- `stdlib`: Provides standard library functions and types.

## Contributing

Contributions are welcome! Please submit pull requests or open issues on the project's GitHub repository.

## License

This module is released under the Apache License, Version 2.0.
