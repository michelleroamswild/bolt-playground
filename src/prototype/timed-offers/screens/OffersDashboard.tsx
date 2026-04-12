import { useState } from 'react';
import { Button, Combobox, Icon, Tag } from '../../../components';
import './OffersDashboard.css';

export interface Offer {
  id: string;
  name: string;
  dateCreated: string;
  dateCreatedTime: string;
  expirationDate: string;
  expirationTime: string;
  views: number;
  conversion: string;
  status: 'active' | 'inactive';
  total: string;
  emoji: string;
  color: string;
}

export const OFFERS: Offer[] = [
  { id: '1', name: 'Lightning Lips',       dateCreated: 'Dec 13, 2023', dateCreatedTime: '12:31 PM', expirationDate: 'Dec 12, 2023', expirationTime: '12:31 PM', views: 3,   conversion: '6.36%', status: 'active',   total: '$20.99',  emoji: '💄', color: '#f5f0e8' },
  { id: '2', name: 'Matcha Powder (200g)', dateCreated: 'Nov 21, 2023', dateCreatedTime: '12:31 PM', expirationDate: 'Dec 10, 2023', expirationTime: '12:31 PM', views: 456, conversion: '6.36%', status: 'active',   total: '$560.45', emoji: '🍵', color: '#e8f5e0' },
  { id: '3', name: 'Early Bird Coffee (16oz)', dateCreated: 'Nov 1, 2023', dateCreatedTime: '12:31 PM', expirationDate: 'Dec 9, 2023', expirationTime: '12:31 PM', views: 68,  conversion: '6.36%', status: 'active',   total: '$320.99', emoji: '☕', color: '#f5ede0' },
  { id: '4', name: 'Thai Tea (12oz)',      dateCreated: 'Dec 1, 2023',  dateCreatedTime: '12:31 PM', expirationDate: 'Dec 1, 2023',  expirationTime: '12:31 PM', views: 15,  conversion: '6.36%', status: 'inactive', total: '$30.45',  emoji: '🧋', color: '#f5e8e0' },
];

interface OffersDashboardProps {
  onSelectOffer: (offer: Offer) => void;
  onCreate: () => void;
}

export function OffersDashboard({ onSelectOffer, onCreate }: OffersDashboardProps) {
  const [store, setStore] = useState('main');
  const storeOptions = [
    { value: 'main', label: 'Main store', leadingIcon: <Icon name="building" size="s" /> },
    { value: 'secondary', label: 'Secondary store', leadingIcon: <Icon name="building" size="s" /> },
  ];

  return (
    <div className="od">
      <div className="od__page-header">
        <h1 className="text-h1">Post-purchase Timed Offers</h1>
        <div className="od__store-select">
          <Combobox value={store} onChange={setStore} options={storeOptions} size="s" />
        </div>
      </div>

      <div className="od__main">
        <div className="od__card">
          <div className="od__card-header">
            <h2 className="od__card-title">Offers</h2>
            <Button variant="secondary" size="s" onClick={onCreate}>Create Offer</Button>
          </div>

          <div className="od__filters">
            <button className="od__chip" type="button">
              <span>Sort by: Expiration date (descending)</span>
              <Icon name="chevron_down" size="s" />
            </button>
            <button className="od__chip" type="button">
              <span>Status: All</span>
              <Icon name="chevron_down" size="s" />
            </button>
          </div>

          <div className="od__table">
            <div className="od__thead">
              <div className="od__th od__col-image">Image</div>
              <div className="od__th od__col-name">Name</div>
              <div className="od__th od__col-date">Date Created</div>
              <div className="od__th od__col-date">Expiration Date</div>
              <div className="od__th od__col-num">Views</div>
              <div className="od__th od__col-num">Conversion</div>
              <div className="od__th od__col-status">Status</div>
              <div className="od__th od__col-total">Total $</div>
              <div className="od__th od__col-arrow" />
            </div>

            {OFFERS.map(o => (
              <div key={o.id} className="od__tr" onClick={() => onSelectOffer(o)}>
                <div className="od__td od__col-image">
                  <div className="od__thumb" style={{ background: o.color }}>
                    <span>{o.emoji}</span>
                  </div>
                </div>
                <div className="od__td od__col-name">
                  <span className="od__td-text">{o.name}</span>
                </div>
                <div className="od__td od__col-date">
                  <div className="od__datetime">
                    <span className="od__td-text">{o.dateCreated}</span>
                    <span className="od__time">{o.dateCreatedTime}</span>
                  </div>
                </div>
                <div className="od__td od__col-date">
                  <div className="od__datetime">
                    <span className="od__td-text">{o.expirationDate}</span>
                    <span className="od__time">{o.expirationTime}</span>
                  </div>
                </div>
                <div className="od__td od__col-num">
                  <span className="od__td-text">{o.views}</span>
                </div>
                <div className="od__td od__col-num">
                  <span className="od__td-text">{o.conversion}</span>
                </div>
                <div className="od__td od__col-status">
                  <Tag sentiment={o.status === 'active' ? 'success' : 'quiet'}>
                    {o.status === 'active' ? 'Active' : 'Inactive'}
                  </Tag>
                </div>
                <div className="od__td od__col-total">
                  <span className="od__td-text">{o.total}</span>
                </div>
                <div className="od__td od__col-arrow">
                  <button className="od__row-action" aria-label="View offer">
                    <Icon name="arrow_right" size="s" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
