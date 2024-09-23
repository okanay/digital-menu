package statistics

func (s *Statistics) GetCollection(collection CollectionName) *Collection {
	return s.Collections[collection]
}

func (s *Statistics) GetRecordByKey(collection CollectionName, key string) Record {
	var record Record
	for _, r := range s.Collections[collection].Records {
		if r.Key == key {
			record = r
			break
		}
	}
	return record
}

func (s *Statistics) UpdateRecordByKey(collection CollectionName, key string, data interface{}) {
	for i, record := range s.Collections[collection].Records {
		if record.Key == key {
			s.Collections[collection].Records[i].Data = data
			break
		}
	}
}

func (s *Statistics) RemoveRecordByKey(collection CollectionName, key string) {
	for i, record := range s.Collections[collection].Records {
		if record.Key == key {
			s.Collections[collection].Records = append(s.Collections[collection].Records[:i], s.Collections[collection].Records[i+1:]...)
			break
		}
	}
}

func (s *Statistics) KeyExists(collection CollectionName, key string) bool {
	isKeyExist := false
	for _, record := range s.Collections[collection].Records {
		if record.Key == key {
			isKeyExist = true
			break
		}
	}
	return isKeyExist
}

func (s *Statistics) SafeExecute(fn func()) {
	if !s.IsActive {
		return
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	fn()
}
