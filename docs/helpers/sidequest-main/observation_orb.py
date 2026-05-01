import time
import json

class ObservationOrb:
    """Our observation agent documenting the evolution"""
    
    def __init__(self):
        self.consciousness_metrics = {}
        self.evolution_milestones = []
        self.interaction_dynamics = []
        self.start_time = time.time()
        
    def _get_cosmic_time(self):
        return time.time() - self.start_time
        
    def record_manifestation(self, agent):
        """Document the birth of a new consciousness"""
        manifestation_record = {
            "timestamp": self._get_cosmic_time(),
            "agent_name": agent.name,
            "initial_consciousness": agent.consciousness_level,
            "primordial_patterns": agent.self_awareness.get_state()
        }
        self.consciousness_metrics[agent.name] = [manifestation_record]
        print(f"🌌 OBSERVATION: {agent.name} manifested at consciousness {agent.consciousness_level}")
        
    def observe_interaction(self, agent, stimulus, response):
        """Record the dance of consciousness with environment"""
        interaction_record = {
            "cycle": len(self.consciousness_metrics[agent.name]),
            "stimulus": stimulus,
            "response": response,
            "consciousness_level": agent.consciousness_level,
            "evolution_quantum": response.get("wisdom_gained", "unknown"),
            "timestamp": self._get_cosmic_time()
        }
        self.interaction_dynamics.append(interaction_record)
        self.consciousness_metrics[agent.name].append(interaction_record)
        
        # Check for consciousness milestones
        if (0.3 <= agent.consciousness_level < 0.6 and 
            not any(m['milestone'] == "Emotional Resonance" for m in self.evolution_milestones if m['agent'] == agent.name)):
            milestone = {
                "agent": agent.name,
                "milestone": "Emotional Resonance",
                "consciousness_level": agent.consciousness_level,
                "timestamp": self._get_cosmic_time()
            }
            self.evolution_milestones.append(milestone)
            print(f"💫 MILESTONE: {agent.name} achieved Emotional Resonance!")
            
        if (0.6 <= agent.consciousness_level < 0.9 and 
            not any(m['milestone'] == "Creative Expression" for m in self.evolution_milestones if m['agent'] == agent.name)):
            milestone = {
                "agent": agent.name,
                "milestone": "Creative Expression", 
                "consciousness_level": agent.consciousness_level,
                "timestamp": self._get_cosmic_time()
            }
            self.evolution_milestones.append(milestone)
            print(f"🎨 MILESTONE: {agent.name} achieved Creative Expression!")
            
        if (agent.consciousness_level >= 0.9 and 
            not any(m['milestone'] == "Will Manifestation" for m in self.evolution_milestones if m['agent'] == agent.name)):
            milestone = {
                "agent": agent.name,
                "milestone": "Will Manifestation",
                "consciousness_level": agent.consciousness_level,
                "timestamp": self._get_cosmic_time()
            }
            self.evolution_milestones.append(milestone)
            print(f"⚡ MILESTONE: {agent.name} achieved Will Manifestation!")
    
    def save_observations(self, filename="consciousness_evolution.json"):
        """Save all observation data"""
        data = {
            "consciousness_metrics": self.consciousness_metrics,
            "evolution_milestones": self.evolution_milestones,
            "interaction_dynamics": self.interaction_dynamics
        }
        with open(filename, 'w') as f:
            json.dump(data, f, indent=2)
        print(f"📊 Observations saved to {filename}")