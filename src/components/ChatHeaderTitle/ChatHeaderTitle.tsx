import React from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react';
import {Text} from 'react-native-paper';

import {styles} from './styles';
import {chatSessionStore, modelStore} from '../../store';
import {useTheme} from '../../hooks';

export const ChatHeaderTitle: React.FC = observer(() => {
  const theme = useTheme();
  const activeSessionId = chatSessionStore.activeSessionId;
  const activeSession = chatSessionStore.sessions.find(
    session => session.id === activeSessionId,
  );
  const activeModel = modelStore.activeModel;

  return (
    <View style={styles.container}>
      <Text
        numberOfLines={1}
        variant="titleSmall"
        style={{color: theme.colors.primary, fontWeight: '700'}}>
        {activeSession?.title || 'TARS AI'}
      </Text>
      {activeModel?.name && (
        <Text
          numberOfLines={1}
          variant="bodySmall"
          style={{color: theme.colors.onSurfaceVariant}}>
          {activeModel?.name}
        </Text>
      )}
    </View>
  );
});
