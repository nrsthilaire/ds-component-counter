CREATE TABLE IF NOT EXISTS ds_usage (
  id SERIAL PRIMARY KEY,
  component VARCHAR(100) NOT NULL,
  route TEXT,
  hostname TEXT,
  app_version TEXT,
  environment VARCHAR(50) DEFAULT 'production',
  timestamp TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ds_usage_component ON ds_usage(component);
CREATE INDEX IF NOT EXISTS idx_ds_usage_timestamp ON ds_usage(timestamp);
