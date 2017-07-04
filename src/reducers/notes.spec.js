import notes from './notes';
import { PUT_NOTE } from '../actions/notes';

describe('reducers', () => {
  describe('notes', () => {
    it('should provide the initial state', () => {
      expect(notes(undefined, {})).toEqual({});
    });

    it('should handle PUT_NOTE action', () => {
      expect(
        notes({}, { type: PUT_NOTE, id: 1, mediaType: 'flick', note: 'hello' })
      ).toEqual({
        flick_1: 'hello'
      });
    });
  });
});
