// Mock API for ARGO float data
// In a real Next.js app, these would be in pages/api/ or app/api/

export interface Float {
  id: string;
  lat: number;
  lon: number;
  alt: number;
  last_seen: string;
  profile_count: number;
  params: string[];
  trajectory: Array<{
    lat: number;
    lon: number;
    time: string;
  }>;
}

export interface FloatProfile {
  id: string;
  timestamp: string;
  location: {
    lat: number;
    lon: number;
    alt: number;
  };
  profile: Array<{
    depth: number;
    temperature: number;
    salinity: number;
  }>;
  meta: {
    source: string;
    platform_type: string;
    mesh_quality: string;
  };
}

export interface QueryResponse {
  query_id: string;
  matched_floats: string[];
  action: string;
  visualization: {
    type: string;
    profiles: Array<{
      float_id: string;
      profile_api: string;
    }>;
    chart_instructions: {
      x: string;
      y: string;
      y_inverted: boolean;
    };
  };
  text_answer: string;
  confidence: number;
}

// Mock data
export const mockFloats: Float[] = [
  {
    id: "R12345",
    lat: 0.3245,
    lon: 34.2351,
    alt: -2.0,
    last_seen: "2023-03-12T05:23:00Z",
    profile_count: 58,
    params: ["temperature", "salinity", "oxygen"],
    trajectory: [
      { lat: 0.1, lon: 34.0, time: "2023-01-01T00:00:00Z" },
      { lat: 0.2, lon: 34.1, time: "2023-02-01T00:00:00Z" },
      { lat: 0.3245, lon: 34.2351, time: "2023-03-12T05:23:00Z" }
    ]
  },
  {
    id: "R67890",
    lat: -0.0021,
    lon: 36.1212,
    alt: -1.5,
    last_seen: "2023-03-20T10:11:00Z",
    profile_count: 64,
    params: ["temperature", "salinity"],
    trajectory: [
      { lat: -0.5, lon: 35.8, time: "2023-01-10T00:00:00Z" },
      { lat: -0.2, lon: 36.0, time: "2023-02-15T00:00:00Z" },
      { lat: -0.0021, lon: 36.1212, time: "2023-03-20T10:11:00Z" }
    ]
  }
];

export const mockProfiles: Record<string, FloatProfile> = {
  "R12345": {
    id: "R12345",
    timestamp: "2023-03-12T05:23:00Z",
    location: { lat: 0.3245, lon: 34.2351, alt: -2.0 },
    profile: [
      { depth: 0, temperature: 29.2, salinity: 35.0 },
      { depth: 10, temperature: 28.8, salinity: 35.1 },
      { depth: 20, temperature: 27.5, salinity: 35.2 },
      { depth: 50, temperature: 24.1, salinity: 35.4 },
      { depth: 100, temperature: 16.9, salinity: 35.6 },
      { depth: 200, temperature: 12.8, salinity: 35.7 }
    ],
    meta: { source: "Argo", platform_type: "float", mesh_quality: "good" }
  },
  "R67890": {
    id: "R67890",
    timestamp: "2023-03-20T10:11:00Z",
    location: { lat: -0.0021, lon: 36.1212, alt: -1.5 },
    profile: [
      { depth: 0, temperature: 28.8, salinity: 35.1 },
      { depth: 10, temperature: 28.5, salinity: 35.2 },
      { depth: 20, temperature: 27.2, salinity: 35.3 },
      { depth: 50, temperature: 23.8, salinity: 35.5 },
      { depth: 100, temperature: 16.5, salinity: 35.7 },
      { depth: 200, temperature: 12.3, salinity: 35.8 }
    ],
    meta: { source: "Argo", platform_type: "float", mesh_quality: "good" }
  }
};

// Mock API functions
export const getFloats = async (params?: {
  bbox?: [number, number, number, number];
  start?: string;
  end?: string;
  params?: string;
}): Promise<{ count: number; floats: Float[] }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    count: mockFloats.length,
    floats: mockFloats
  };
};

export const getFloatProfile = async (id: string, depths?: string): Promise<FloatProfile> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const profile = mockProfiles[id];
  if (!profile) {
    throw new Error(`Float ${id} not found`);
  }
  
  return profile;
};

export const queryOceanData = async (query: {
  query: string;
  location?: { lat: number; lon: number };
  radius_km?: number;
  start_date?: string;
  end_date?: string;
  user_id?: string;
}): Promise<QueryResponse> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    query_id: `q-${Date.now()}`,
    matched_floats: ["R12345", "R67890"],
    action: "visualize_profiles",
    visualization: {
      type: "compare_profiles",
      profiles: [
        { float_id: "R12345", profile_api: "/api/floats/R12345/profile" },
        { float_id: "R67890", profile_api: "/api/floats/R67890/profile" }
      ],
      chart_instructions: { x: "salinity", y: "depth", y_inverted: true }
    },
    text_answer: `Found ${mockFloats.length} floats matching your query "${query.query}". The data shows interesting patterns in the selected region.`,
    confidence: 0.92
  };
};

export const getNearestFloats = async (lat: number, lon: number, n: number = 5): Promise<Float[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Simple mock - return all floats (in real implementation, would calculate distances)
  return mockFloats.slice(0, n);
};