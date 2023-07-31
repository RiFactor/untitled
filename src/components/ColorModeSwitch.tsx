import { HStack, Switch, useColorMode, Text, VStack } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      {/* <div className="flex flex-row gap-2"> */}
      {/* Question -- why isn't this showing */}
      <Switch colorScheme="green" isChecked={colorMode === "dark"} onChange={toggleColorMode} />
      <Text>Dark Mode</Text>
      {/* </div> */}
    </HStack>
  );
};

export default ColorModeSwitch;
