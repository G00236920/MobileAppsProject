import { Component } from '@angular/core';

import { NewPage } from '../new/new';
import { SendPage } from '../send/send';
import { AccountsPage } from '../accounts/accounts';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AccountsPage;
  tab2Root = NewPage;
  tab3Root = SendPage;

  constructor() {

  }
}
