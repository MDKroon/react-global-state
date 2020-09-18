# Changelog

## [UNRELEASED]

## Added
- support for arrays

### Changed
- improved error warnings

## [1.0.3] 2020-09-13

### Fixed
- crash if dispatch `ADD` was used with an undefined state name or property
- crash if dispatch `RESET` was used with an undefined state property

### Added
- `DELETE` dispatch type
- [documentation](DOCUMENTATION.md) to keep the readme concise
- [changelog](CHANGELOG.md) to track fixed and new features

### Changed
- improved [readme](readme.md)

## [1.0.2] 2020-09-06

### Added
- keywords for npm in `package.json`

### Changed
- improved demo in [/example](https://github.com/MDKroon/react-global-state/tree/master/example)

## [1.0.1] 2020-09-06

### Fixed
- incorrect code in getting started instruction

## [1.0.0] 2020-09-06

### Added
- StateProvider component
- useContextState hook containing the dispatch and global state
- `UPDATE`, `ADD`, `RESET` dispatch types
- demo in [/example](https://github.com/MDKroon/react-global-state/tree/master/example) for using this package
