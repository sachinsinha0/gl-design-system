import { Link } from 'react-router-dom';
import { useActiveDSId } from '../../platform/ds-context';

export function HomePage() {
  const dsId = useActiveDSId();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>GLDS-Web</div>
        <h1 style={{ fontSize: 44, fontWeight: 700, margin: 0 }}>HTML + CSS recipes</h1>
        <p style={{ fontSize: 16, marginTop: 8 }}>No JavaScript framework required. Copy markup and CSS into any stack.</p>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <Link to={`/${dsId}/button`}><button className="glds-btn glds-btn--primary">Browse components</button></Link>
        <Link to={`/${dsId}/tokens`}><button className="glds-btn glds-btn--secondary">View tokens</button></Link>
      </div>
    </div>
  );
}
