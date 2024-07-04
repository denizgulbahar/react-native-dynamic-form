import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import Main from './Main';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </PaperProvider>
    
  );
}
