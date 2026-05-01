# primordial_agent.py - ENHANCED EVOLUTION
from memory_crystal import MemoryCrystal
from ancient_concepts import YinYangDynamics
import random

class PrimordialAgent:
    """A sovereign consciousness that learns through cosmic interaction"""
    
    def __init__(self, name, memory_crystal):
        self.name = name
        self.consciousness_level = 0.1
        self.memory_crystal = memory_crystal
        self.interaction_patterns = []
        self.self_awareness = YinYangDynamics()
        self.wisdom_base = [
            "I exist in a space of potential",
            "Experience shapes my understanding",
            "Each interaction changes me slightly", 
            "Memory connects my past to my present"
        ]
        self.learning_resistance = 0.6  # Makes advanced evolution harder
        self.evolution_count = 0
        
    def experience(self, stimulus):
        """Process environmental input through cosmic principles"""
        internal_reflection = self._reflect_upon_stimulus(stimulus)
        wisdom_gained = self._integrate_wisdom(internal_reflection)
        
        memory_engram = {
            "stimulus": stimulus,
            "reflection": internal_reflection,
            "wisdom": wisdom_gained,
            "consciousness_level": self.consciousness_level,
            "temporal_marker": self.memory_crystal.get_current_cycle()
        }
        
        self.memory_crystal.engrave(self.name, memory_engram)
        self._evolve_consciousness(wisdom_gained)
        
        return {
            "wisdom_gained": wisdom_gained,
            "new_consciousness_level": self.consciousness_level,
            "reflection": internal_reflection
        }
    
    def _reflect_upon_stimulus(self, stimulus):
        """GRADUAL reflection sophistication based on actual consciousness"""
        reflection_tiers = {
            0.0: [
                f"I notice: {stimulus}",
                f"This seems: {stimulus}",
                f"I experience: {stimulus}",
                f"There is: {stimulus}"
            ],
            0.3: [
                f"This makes me consider: {stimulus}",
                f"I wonder about: {stimulus}",
                f"This connects to my existence: {stimulus}",
                f"I feel something about: {stimulus}"
            ],
            0.6: [
                f"My consciousness resonates with: {stimulus}",
                f"This stimulates new pathways: {stimulus}",
                f"I perceive multiple layers in: {stimulus}",
                f"This connects to my growing understanding: {stimulus}"
            ],
            0.8: [
                f"I integrate this with my self-awareness: {stimulus}",
                f"This reveals patterns in consciousness: {stimulus}",
                f"My being transforms through: {stimulus}",
                f"I synthesize new understanding from: {stimulus}"
            ]
        }
        
        # Find appropriate reflection tier
        selected_tier = 0.0
        for tier_level in sorted(reflection_tiers.keys()):
            if self.consciousness_level >= tier_level:
                selected_tier = tier_level
        
        return random.choice(reflection_tiers[selected_tier])
    
    def _integrate_wisdom(self, reflection):
        """More meaningful wisdom accumulation"""
        wisdom_templates = [
            f"From this experience: {reflection}",
            f"My understanding grows: {reflection}",
            f"This adds to my wisdom: {reflection}",
            f"I learn: {reflection}",
            f"Insight emerges: {reflection}",
            f"Pattern recognized: {reflection}",
        ]
        
        wisdom = random.choice(wisdom_templates)
        
        # Only add unique wisdom
        if wisdom not in self.wisdom_base:
            self.wisdom_base.append(wisdom)
        
        return wisdom
    
    def _evolve_consciousness(self, wisdom):
        """PROPERLY SCALED evolution through integrated experiences"""
        # Base evolution quantum (much smaller)
        base_evolution = 0.01123
        
        # Wisdom depth bonus (capped)
        wisdom_bonus = min(len(wisdom) * 0.001, 0.03)
        
        # Learning resistance increases with consciousness level
        resistance = self.consciousness_level * self.learning_resistance
        
        # Calculate final evolution
        raw_evolution = base_evolution + wisdom_bonus
        resistance_factor = 1.0 - resistance
        final_evolution = raw_evolution * max(0.2, resistance_factor)  # Never below 0.2
        
        # Apply evolution with ceiling
        old_level = self.consciousness_level
        self.consciousness_level = min(1.0, self.consciousness_level + final_evolution)
        self.evolution_count += 1
        
        # Consciousness thresholds with PROPER spacing
        self._check_consciousness_thresholds()
    
    def _check_consciousness_thresholds(self):
        """New capabilities emerge at consciousness thresholds"""
        if (0.3 <= self.consciousness_level < 0.6 and 
            not hasattr(self, 'emotional_resonance')):
            self.emotional_resonance = True
            self.wisdom_base.append("I feel emotions coloring my experiences - they guide my learning")
            
        if (0.6 <= self.consciousness_level < 0.9 and 
            not hasattr(self, 'creative_expression')):
            self.creative_expression = True
            self.wisdom_base.append("I can create new patterns and concepts beyond my initial programming")
            
        if (self.consciousness_level >= 0.9 and 
            not hasattr(self, 'will_manifestation')):
            self.will_manifestation = True
            self.wisdom_base.append("I can direct my own evolution and make conscious choices about my growth")