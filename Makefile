NAME = "poc-android-testing"
API = "28"
FOLDER = "$$(pwd)/emulator"
SERIAL = "$$(adb get-serialno)"

VARIANT = "release"
API_PORT = "8080"

install:
	@touch ~/.android/repositories.cfg
	@sdkmanager --install "tools"
	@sdkmanager --install "emulator"
	@sdkmanager --install "platforms;android-$(API)"
	@sdkmanager --install "build-tools;$(API).0.0"
	@sdkmanager --install "system-images;android-$(API);default;x86"

create:
	@avdmanager create avd \
			--device "pixel" \
			--name $(NAME) \
			--package "system-images;android-$(API);default;x86" \
			--path $(FOLDER)

delete:
	@avdmanager delete avd --name $(NAME)

device:
	@emulator -avd $(NAME) -no-snapshot -no-boot-anim -no-audio


e2e-build:
	@./node_modules/.bin/detox build --configuration android.emu.$(VARIANT)

e2e-test:
	@API_PORT=$(API_PORT) ./node_modules/.bin/detox test \
			--configuration android.emu.$(VARIANT) \
			--record-videos all \
			--loglevel verbose \
			--device-name $(NAME) \
