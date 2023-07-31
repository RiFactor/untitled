import { HStack, Switch, useColorMode, Text, VStack } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    //  can just have a react fragment when working
    <HStack>
      {/* Question -- why isn't this showing */}
      <Switch colorScheme="green" isChecked={colorMode === "dark"} onChange={toggleColorMode} />
      <Text>Dark Mode</Text>
    </HStack>
  );
};

export default ColorModeSwitch;
