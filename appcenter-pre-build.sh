#!/usr/bin/env bash
# Creates an .env from ENV variables for use with react-native-config
ENV_WHITELIST=${ENV_WHITELIST:-"^CONFIG_"}
printf "Creating an .env file with the following whitelist:\n"
printf "%s\n" $ENV_WHITELIST
set | egrep -e $ENV_WHITELIST | sed 's/^CONFIG_//g' > .env
printf "\n.env created with contents:\n\n"
cat .env

printf "Create google services config file\n"
echo "$GOOGLE_SERVICES" > ./android/app/google-services.json
sed -i -e 's/\\"/'\"'/g' ./android/app/google-services.json
echo "google-services file content:"
cat ./android/app/google-services.json

if ["$RN_RELEASE_TYPE" != "prod"]; then
    printf "Install imagemagick:\n"
    brew install imagemagick
else
    printf "Skip imagemagick installation for production relese.\n"
fi

printf "Executing fastlane prep_relese_type:\n"
bundle install
bundle exec fastlane prep_release_type