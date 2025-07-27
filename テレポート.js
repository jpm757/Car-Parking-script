(async () => {
  
  let editedAddresses = [];

  function searchAndSaveAddresses(searchValue) {
    h5gg.searchNumber(searchValue, 'F32', '0x000000000', '0x200000000');
    let count = h5gg.getResultsCount();
    if (count > 0) {
      editedAddresses = [];
      for (let i = 0; i < count; i++) {
        editedAddresses.push(h5gg.getValue(i)); // 値を保存しても意味ないので下で再設定
      }
      return true;
    } else {
      console.log(`❌ ${searchValue} の検索結果が0件`);
      return false;
    }
  }

  function editAllAtSavedAddresses(value) {
    let count = h5gg.getResultsCount();
    if (count > 0) {
      h5gg.editAll(value, 'F32');
      console.log(`✅ ${value} に editAll`);
    } else {
      console.log(`❌ アドレスが存在しないため editAll スキップ (${value})`);
    }
  }

  if (!localStorage.getItem("firstRunCompleted")) {
    
    h5gg.clearResults();
    h5gg.searchNumber('-10', 'F32', '0x000000000', '0x200000000');
    h5gg.searchNearby('49', 'F32', '0x100');
    h5gg.searchNumber('-10', 'F32', '0x000000000', '0x200000000');
    h5gg.editAll('999999999999999999', 'F32');

    h5gg.clearResults();
    if (searchAndSaveAddresses('-8.5')) {
      h5gg.editAll('999999999999999999', 'F32');

      await new Promise(resolve => setTimeout(resolve, 2000));

      h5gg.clearResults();
      h5gg.searchNumber('999999999999999999', 'F32', '0x000000000', '0x200000000');
      editAllAtSavedAddresses('-8.5');
    }

    localStorage.setItem("firstRunCompleted", "true");
  } else {
    
    h5gg.clearResults();
    if (searchAndSaveAddresses('-8.5')) {
      h5gg.editAll('99999999', 'F32');

      await new Promise(resolve => setTimeout(resolve, 2000));

      h5gg.clearResults();
      h5gg.searchNumber('999999999', 'F32', '0x000000000', '0x200000000');
      editAllAtSavedAddresses('-8.5');
    }
  }
})();