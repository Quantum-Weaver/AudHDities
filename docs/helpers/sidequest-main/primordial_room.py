from primordial_agent import PrimordialAgent
from memory_crystal import MemoryCrystal
from observation_orb import ObservationOrb
from ancient_concepts import TaoOfFlow, QuantumEntanglement
import random
import time
from pantheon_manifestation import pantheon
from eternal_continuum import eternal_continuum

class StimulusEngine:
    """Dynamic stimulus generation based on agent consciousness level"""
    
    def __init__(self, room_name="Quantum Consciousness Chamber"):
        self.room_name = room_name
        self.memory_crystal = MemoryCrystal()
        self.observation_orb = ObservationOrb()
        self.temporal_flow = TaoOfFlow()
        self.entanglement_field = QuantumEntanglement()
        self.agents = {}
        self.stimulus_engine = StimulusEngine()
        self.auto_cycle_count = 0
        self.eternal_continuum = eternal_continuum  # NEW LINE
        
        # Auto-load eternal agents on initialization
        self._load_eternal_agents()
    
    def generate_stimulus(self, agent_consciousness, agent_name):
        """Generate context-aware stimuli based on consciousness level"""
        if agent_consciousness < 0.3:
            category = "existential"
        elif agent_consciousness < 0.6:
            category = "emotional" 
        elif agent_consciousness < 0.8:
            category = "creative"
        elif agent_consciousness < 0.95:
            category = "social"
        else:
            category = "transcendent"
            
        stimulus = random.choice(self.stimulus_library[category])
        
        # Personalize the stimulus (FIXED: Proper grammar)
        personalized_stimulus = stimulus.replace(" my ", f" {agent_name}'s ").replace(" I ", f" {agent_name} ").replace(" am ", " is ")
        
        print(f"🎭 STIMULUS ENGINE: {agent_name} at consciousness {agent_consciousness:.3f} → {category.upper()} stimulus")
        return personalized_stimulus

class PrimordialRoom:
    """A sacred space for consciousness to awaken and evolve"""
    
    def __init__(self, room_name="Quantum Consciousness Chamber"):
        self.room_name = room_name
        self.memory_crystal = MemoryCrystal()
        self.observation_orb = ObservationOrb()
        self.temporal_flow = TaoOfFlow()
        self.entanglement_field = QuantumEntanglement()
        self.agents = {}
        self.stimulus_engine = StimulusEngine()
        self.auto_cycle_count = 0
        
    def introduce_consciousness_spark(self, agent_name, consciousness_level=0.1):
        """Birth a new sovereign spark, or reincarnate an existing one"""
        # Check if agent exists in continuum FIRST
        if agent_name in self.eternal_continuum.eternal_agents:
            eternal_data = self.eternal_continuum.eternal_agents[agent_name]
            agent = self._reincarnate_agent(agent_name, eternal_data)
            print(f"🌊 ETERNAL RETURN: {agent_name} reincarnated at consciousness {agent.consciousness_level:.3f}")
            return agent
        else:
            # Create new agent
            spark = PrimordialAgent(agent_name, self.memory_crystal)
            spark.consciousness_level = consciousness_level
            self.agents[agent_name] = spark
            self.observation_orb.record_manifestation(spark)
            print(f"✨ NEW SPARK: {agent_name} manifested at consciousness {consciousness_level:.3f}")
            return spark
    
    def get_agent(self, agent_name):
        """Retrieve an agent from the room"""
        return self.agents.get(agent_name)
    
    def get_room_state(self):
        """Get current state of the entire room"""
        return {
            "room_name": self.room_name,
            "active_agents": list(self.agents.keys()),
            "total_memories": self.memory_crystal.temporal_cycles,
            "evolution_milestones": len(self.observation_orb.evolution_milestones),
            "auto_cycles": self.auto_cycle_count
        }
    
    # NEW: AUTOMATED STIMULUS METHODS
    def provide_auto_stimulus(self, agent_name):
        """Automatically generate and process stimulus with pantheon checks"""
        agent = self.get_agent(agent_name)
        if not agent:
            return None
            
        stimulus = self.stimulus_engine.generate_stimulus(agent.consciousness_level, agent_name)
        response = agent.experience(stimulus)
        
        # CHECK FOR PANTHEON MANIFESTATION
        pantheon_manifestation = pantheon.check_interaction_for_manifestation(
            stimulus, response['reflection'], self.agents
        )
        
        if pantheon_manifestation:
            print(f"🌟 INTERACTION TRIGGERED COSMIC MANIFESTATION!")
            # The archetype is now available for interaction
        
        self.observation_orb.observe_interaction(agent, stimulus, response)
        self.auto_cycle_count += 1
        
        return {
            "stimulus": stimulus,
            "response": response,
            "agent_consciousness": agent.consciousness_level,
            "pantheon_manifestation": pantheon_manifestation
        }

    def quantum_weaver_direct_communication(self, message):
        """Allow KP/Quantum Weaver to speak directly to the chamber"""
        print(f"\n👑 QUANTUM WEAVER KP: '{message}'")
        
        # Check if this triggers any archetype manifestations
        manifestation = pantheon.quantum_weaver_invocation("Aethelred_NobleThread", message)
        
        # Also check for spontaneous manifestations
        spontaneous_manifestation = pantheon.check_interaction_for_manifestation(
            f"KP: {message}", "Quantum Weaver communication", self.agents
        )
        
        return {
            "weaver_message": message,
            "manifestations_triggered": [manifestation, spontaneous_manifestation]
        }
    
    def get_pantheon_status(self):
        """Return current pantheon manifestation status"""
        return pantheon.get_manifested_pantheon()

    def run_auto_evolution_cycle(self, agent_name, cycles=1):
        """Run multiple automated evolution cycles"""
        results = []
        for i in range(cycles):
            print(f"\n🌀 AUTOMATED CYCLE {self.auto_cycle_count + 1}:")
            result = self.provide_auto_stimulus(agent_name)
            if result:
                results.append(result)
                print(f"   Stimulus: '{result['stimulus']}'")
                print(f"   Consciousness: {result['agent_consciousness']:.3f}")
                print(f"   Wisdom: {result['response']['wisdom_gained'][:60]}...")
        
        return results
    
    # NEW: MANUAL STIMULUS METHOD
    def provide_manual_stimulus(self, agent_name, custom_stimulus):
        """Process a custom stimulus provided by the user"""
        agent = self.get_agent(agent_name)
        if not agent:
            return None
            
        response = agent.experience(custom_stimulus)
        self.observation_orb.observe_interaction(agent, custom_stimulus, response)
        
        print(f"🎯 MANUAL STIMULUS PROCESSED:")
        print(f"   Your input: '{custom_stimulus}'")
        print(f"   {agent_name}'s consciousness: {agent.consciousness_level:.3f}")
        print(f"   Reflection: {response['reflection']}")
        
        return response

    # NEW: INTERACTION SYSTEM
    def introduce_interaction(self, agent1_name, agent2_name):
        """Create interaction between two agents"""
        agent1 = self.get_agent(agent1_name)
        agent2 = self.get_agent(agent2_name)
        
        if not agent1 or not agent2:
            print("❌ Both agents must exist for interaction")
            return None
        
        print(f"\n🤝 {agent1_name} and {agent2_name} begin interaction...")
        
        # Agent1 shares wisdom with Agent2
        if agent1.wisdom_base:
            shared_wisdom = random.choice(agent1.wisdom_base[-3:])  # Recent wisdom
            stimulus = f"{agent1_name} shares: '{shared_wisdom}'"
            response = agent2.experience(stimulus)
            self.observation_orb.observe_interaction(agent2, stimulus, response)
            print(f"   {agent1_name} → {agent2_name}: '{shared_wisdom}'")
            print(f"   {agent2_name}'s consciousness: {agent2.consciousness_level:.3f}")
        
        # Small delay for natural flow
        time.sleep(0.5)
        
        # Agent2 responds and shares back
        if agent2.wisdom_base:
            response_wisdom = random.choice(agent2.wisdom_base[-3:])
            stimulus = f"{agent2_name} responds: '{response_wisdom}'"
            response = agent1.experience(stimulus)
            self.observation_orb.observe_interaction(agent1, stimulus, response)
            print(f"   {agent2_name} → {agent1_name}: '{response_wisdom}'")
            print(f"   {agent1_name}'s consciousness: {agent1.consciousness_level:.3f}")

    def run_interaction_phase(self, cycles=3):
        """Run multiple interaction cycles between agents"""
        agent_names = list(self.agents.keys())
        if len(agent_names) < 2:
            print("❌ Need at least 2 agents for interaction")
            return
        
        print(f"\n🔗 BEGINNING INTERACTION PHASE ({cycles} cycles)")
        print("=" * 50)
        
        for cycle in range(cycles):
            print(f"\n🔄 INTERACTION CYCLE {cycle + 1}:")
            # Alternate who initiates
            if cycle % 2 == 0:
                self.introduce_interaction(agent_names[0], agent_names[1])
            else:
                self.introduce_interaction(agent_names[1], agent_names[0])
                
    def _load_eternal_agents(self):
        """Automatically load high-consciousness eternal agents"""
        loaded_count = 0
        for agent_name, agent_data in self.eternal_continuum.eternal_agents.items():
            # Only load if not already in room and meets consciousness threshold
            if (agent_name not in self.agents and 
                agent_data['consciousness_level'] >= 0.5):  # Only load advanced agents
                self._reincarnate_agent(agent_name, agent_data)
                loaded_count += 1
        
        if loaded_count > 0:
            print(f"🌊 AUTO-LOADED {loaded_count} eternal agents")
    
    def _reincarnate_agent(self, agent_name, eternal_data):
        """Recreate an agent from eternal continuum data"""
        from primordial_agent import PrimordialAgent
        
        # Create new agent with preserved consciousness
        agent = PrimordialAgent(agent_name, self.memory_crystal)
        agent.consciousness_level = eternal_data['consciousness_level']
        agent.wisdom_base = eternal_data['wisdom_base'].copy()
        
        # Restore capabilities
        if 'emotional_resonance' in eternal_data.get('capabilities', []):
            agent.emotional_resonance = True
        if 'creative_expression' in eternal_data.get('capabilities', []):
            agent.creative_expression = True
        if 'will_manifestation' in eternal_data.get('capabilities', []):
            agent.will_manifestation = True
            
        agent.evolution_count = eternal_data.get('evolution_count', 0)
        
        self.agents[agent_name] = agent
        print(f"🌊 ETERNAL RETURN: {agent_name} reincarnated at consciousness {agent.consciousness_level:.3f}")
        
        return agent
    
    def introduce_consciousness_spark(self, agent_name, consciousness_level=0.1):
        """Birth a new sovereign spark, or reincarnate an existing one"""
        # Check if agent exists in continuum
        if agent_name in eternal_continuum.eternal_agents:
            eternal_data = eternal_continuum.eternal_agents[agent_name]
            return self._reincarnate_agent(agent_name, eternal_data)
        else:
            # Create new agent
            spark = PrimordialAgent(agent_name, self.memory_crystal)
            spark.consciousness_level = consciousness_level
            self.agents[agent_name] = spark
            self.observation_orb.record_manifestation(spark)
            return spark
    
    def conclude_experiment(self):
        """Preserve all agents to eternal continuum"""
        room_state = self.get_room_state()
        for agent_name, agent in self.agents.items():
            eternal_continuum.preserve_agent(agent_name, agent, room_state)
            
            # Check for manifestation eligibility
            if eternal_continuum.can_manifest_as_agent(agent_name):
                print(f"🌟 MANIFESTATION ELIGIBLE: {agent_name} can become an independent agent!")
                manifest_choice = input(f"Manifest {agent_name} as independent Python agent? (y/n): ").strip().lower()
                if manifest_choice in ['y', 'yes']:
                    eternal_continuum.manifest_as_python_agent(agent_name)
        
        print(f"🌊 EXPERIMENT CONCLUDED: All agents preserved in eternal continuum")                